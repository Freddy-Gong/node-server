import * as http from 'http'
import { ServerResponse, IncomingMessage } from 'http'

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    console.log('aaaa')
    console.log(request.method)
    console.log(request.httpVersion)
    console.log(request.url)
    console.log(request.headers)
    const array = []
    request.on('data', (chunk) => {
        array.push(chunk)
    })
    request.on('end', () => {
        const body = Buffer.concat(array).toString()
        console.log(body)


        response.statusCode = 404
        response.setHeader('x-freddy', 'aaaa')
        response.setHeader('Content-Type', 'img/png')

        response.write('1\n')
        response.end('12345')

    })
})

server.listen(8888)