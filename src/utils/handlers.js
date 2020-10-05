export function handleResponseSuccess(res, data, filename) {
  return res.status(200).json({
    status: {
      type: 'success',
      code: 200,
      description: '200 OK'
    },
    output: {
      filename: filename.replace(/\\/g, '/'),
      data: data
    }
  });
}

export function handleResponseError(err, req, res, next) {
  let description = '';
  switch (err.statusCode) {
    case 401:
      description = '401 Unauthorized';
      break;
    case 404:
      description = '404 Not Found';
      break;
    case 500:
      description = '500 Internal Server Error';
  }
  return res.status(err.statusCode).json({
    status: {
      type: 'error',
      code: err.statusCode,
      description: description
    },
    output: {
      filename: err.filename ? err.filename.replace(/\\/g, '/') : undefined,
      error: err.err ? `${err.err.name}: ${err.err.message}` : undefined
    }
  });
}

export class HandlerResponseError extends Error {
  constructor(statusCode, err, filename) {
    super();
    this.statusCode = statusCode;
    this.err = err;
    this.filename = filename;
  }
}
