// import { env } from "./config";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { Pinecone } from "@pinecone-database/pinecone";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

export async function embedAndStoreDocs(
  client: Pinecone,
  // @ts-ignore docs type error
  docs: Document<Record<string, any>>[]
) {
  /*create and store the embeddings in the vectorStore*/
  try {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: "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"}); // LLM API "text-ada-200"
    const index = client.Index(process.env.PINECONE_INDEX_NAME || '');

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
        // @ts-ignore docs type error
        pineconeIndex: index,
        textKey: "text",
        namespace: process.env.PINECONE_NAME_SPACE,
        
    })
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to load your docs !");
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStore(client: Pinecone) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(process.env.PINECONE_INDEX_NAME || '');

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      // @ts-ignore docs type error
      pineconeIndex: index,
      textKey: "text",
      namespace: process.env.PINECONE_NAME_SPACE,
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}