const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-W7Eeu7F9SxJg8nOmHGCEX9yO",
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });

console.log(response.data.choices[0].text)