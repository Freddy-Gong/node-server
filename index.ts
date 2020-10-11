import * as http from 'http'
import { ServerResponse, IncomingMessage } from 'http'
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url'

const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url: pathName, headers } = request
    const { pathname, search } = url.parse(pathName)
    let cacheAge = 3600 * 24 * 365
    if (method === 'POST') {
        response.statusCode = 405
        response.end()
        return
    }
    let filename = pathname.substr(1)
    if (filename === '') {
        filename = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
        if (error) {
            if (error.errno === -4058) {
                response.statusCode = 404
                response.end('文件不存在')
            } else {
                response.statusCode = 500
                response.end('服务器繁忙')
            }
        } else {
            response.setHeader('Catch-Control', `public,max-age=${cacheAge}`)
            response.end(data.toString())
        }
    })

})

server.listen(8888)