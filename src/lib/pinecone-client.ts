import { Pinecone } from "@pinecone-database/pinecone"
// import { env } from "./config"
import { delay } from "./utils"


let pineconeClient: Pinecone | undefined = undefined;

async function createIndex(client: Pinecone, indexName: string) {
    await client.createIndex({
        name: indexName,
        dimension: 1536,
        metric: 'cosine'
    });

    console.log(`Waiting for ${process.env.INDEX_INIT_TIMEOUT} seconds for index to be created...`);
    await delay(2400)
    console.log('Index created successfully!');
}

async function initPineconeClient() {
    try {
        const pineconeClient = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY || '',
            environment: process.env.PINECONE_ENVIRONMENT || '',
        });
    
        const indexName = process.env.PINECONE_INDEX_NAME || '';
        const existingIndexes = await pineconeClient.listIndexes();
    
        if (!existingIndexes.some(index => index.name === indexName)) {
            await createIndex(pineconeClient, indexName);
        } else {
            console.log('Index already exists.');
        }
    
        return pineconeClient;
    } catch (error) {
        console.error(error);
    }
}

export async function getPineconeClient() {
    if (!pineconeClient) {
        pineconeClient = await initPineconeClient();
    }

    return pineconeClient;
}