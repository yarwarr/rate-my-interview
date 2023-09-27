import {PineconeClient, Vector, utils as PineconeUtils} from '@pinecone-database/pinecone'
import { downloadFromS3 } from './s3-server'
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import {Document, RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter'
import { getEmbedding } from './embedding'
import md5 from 'md5'
import { convertToAscii } from './utils'

let pinecone: PineconeClient | null = null

export const getPineconeClient = async () => {
    if(!pinecone) {
        pinecone = new PineconeClient()
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!,
        })
    }
    return pinecone;
}

type PDFPage = {
    pageContent: string;
    metadata: {
        loc: {pageNumber: number}
    }
}

export async function loadS3IntoPinecone(fileKey: string) {
    // TODO: Also figure out a way to store the pdf locally so I dont have to keep downloading and shit
    // 1. obtain the pdf -> Download and read the pdf
    console.log('Downloading s3 into file system....')
    const file_name = await downloadFromS3(fileKey);
    if(!file_name) {
        throw new Error('File not found')
    }
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load() as PDFPage[]);

    // 2. Split and segment the pdf into smaller pieces to be embeded

    const documents = await Promise.all(pages.map(prepareDocument))

    // 3. Vectorize and embed the individual document
    const vectors = await Promise.all(documents.flat().map(embedDocument))
    console.log(vectors)
    // 4. Upload the vectors to pinecone
    const client = await getPineconeClient()
    const pineconeIndex = client.Index('chatpdf')

    console.log('Inserting vectors into pinecone...')
    const namespace = convertToAscii(fileKey)
    console.log('Namespace', namespace)
    PineconeUtils.chunkedUpsert(pineconeIndex, vectors, namespace, 10)

    return documents[0]

}

async function embedDocument(doc: Document) {
    console.log(doc)
    try {
        const embedding = await getEmbedding(doc.pageContent)
        const hash = md5(doc.pageContent)

        return {
            id: hash,
            values: embedding,
            metadata: {
                pageNumber: doc.metadata.pageNumber,
                text: doc.metadata.text
            }
        } as Vector
    } catch (error) {
        console.log('Error embedding document', error)
        throw error
    }
}



export const truncateStringByBytes = (str: string, bytes: number) => {
    const encoder = new TextEncoder()
    return new TextDecoder('utf-8').decode(encoder.encode(str).slice(0, bytes))
}

async function prepareDocument(page: PDFPage) {
    let {pageContent, metadata} = page
    pageContent = pageContent.replace(/\n/g, '')
    // split the docs
    const splitter = new RecursiveCharacterTextSplitter()
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent, 
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
        }
    })
    ])

    console.log(docs)

    return docs
}