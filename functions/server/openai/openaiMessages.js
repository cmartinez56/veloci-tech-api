const got = require("got");

const chatEndPoint = '/chat/completions'

const openAISendMessage = async (urlEndpoint, body) => {
    const options ={
        headers: {
            'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
        },
        json:{
            ...body
        }
    }
    const url ='https://api.openai.com/v1'+urlEndpoint

    const result = await got.post(url, options);
    return JSON.parse(result.body);
}
const sendChatApi = async (messages)=> {
    const body = {
        "model": "gpt-3.5-turbo",
        "messages":messages
    }
    return await openAISendMessage(chatEndPoint,body)
}

module.exports = {sendChatApi}