export const parseBody = async req =>
  new Promise(resolve => {
    let body = '';

    req
      .on('data', chunk => body += chunk)
      .on('end', () => {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      });
  });
