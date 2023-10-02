import {OpenAIApi, Configuration} from 'openai-edge'

const config  = new Configuration({
    apiKey: process.env.OPENAI_KEY,
})

const openai = new OpenAIApi(config)

export async function getEmbedding(text: string) {
    if(!text) {
        console.log('Here')
        console.log(text)
    }
    console.log(text)
    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' ')
        })

        const result = await response.json()
        console.log(result)
        if(!result.data) {
            // TODO handle error
            console.log('Here')
            console.log(result) 
            throw new Error('Error getting embedding')
        }
        return result.data[0].embedding as number[]
    } catch (error) {
        console.log('Error getting embedding', error)
        throw error
    }
}