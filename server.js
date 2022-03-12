const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;

  const { method, url } = request;

  if(url === '/') {
    if(method === 'GET') {
      return response.end('<h1>This is a homepage!</h1>');
    }

    return response.end('<h1>Page cannot be accessed by other request.</h1>');
  }

  if(url === '/about') {
    if(method === 'GET') {
      return response.end('<h1>Hello, this is an about page!</h1>');
    }

    
    if(method === 'POST') {
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      return request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Hi ${name}, this is an about page.</h1>`);
      });
    }

    return response.end('<h1>Page cannot be accessed by other request.</h1>');
  }

  return response.end('<h1>Page Not Found!</h1>');
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`The Server is running at http://${host}:${port}`);
});
