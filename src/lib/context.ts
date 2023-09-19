import { PineconeClient } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbedding } from "./embedding";

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
    const pinecone = new PineconeClient()
    await pinecone.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!
    })

    const index = await pinecone.Index('chatpdf')

    try  {
        const namespace = convertToAscii(fileKey)
        const queryResult = await index.query({
            queryRequest: {
                topK: 5,
                vector: embeddings,
                includeMetadata: true,
                namespace
            }
        })
        return queryResult.matches || []
    } catch (e) {
        console.error('Error querying embeddings',e)
        throw e
    }
}
export async function getContext(query: string, fileKey: string) {
    const queryEmbeddings = await getEmbedding(query)
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey)

    const qualifyingDocs = matches.filter(match => match.score && match.score > 0.7)

    type Metadata  = {
        text: string, 
        pageNumber: number
    }

    let docs = qualifyingDocs.map(match => (match.metadata as Metadata).text)
    return docs.join('\n').substring(0, 3000)
}