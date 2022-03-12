const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { method, url } = request;

  if (url === '/') {
    if (method === 'GET') {
      response.statusCode = 200;
      return response.end(JSON.stringify({
        message: 'This is a homepage!',
      }));
    }

    response.statusCode = 400;
    return response.end(JSON.stringify({
      message: 'Page cannot be accessed by other request.',
    }));
  }

  if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = 200;
      return response.end(JSON.stringify({
        message: 'Hello, this is an about page!',
      }));
    }

    if (method === 'POST') {
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      return request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(JSON.stringify({
          message: `Hi ${name}, this is an about page.`,
        }));
      });
    }

    response.statusCode = 400;
    return response.end(JSON.stringify({
      message: 'Page cannot be accessed by other request.',
    }));
  }

  response.statusCode = 404;
  return response.end(JSON.stringify({
    message: 'Page Not Found!',
  }));
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`The Server is running at http://${host}:${port}`);
});
