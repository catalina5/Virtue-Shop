import http from 'src/utils/http'

export const chatWithBot = (body: { question: string }) => http.post('/chat/question', body)
