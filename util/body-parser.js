module.exports = (request) => {
  return new Promise((reslove, reject) => {
    try {
      let body = ''
      request.on('data', (chunk) => {
        body += chunk;
      })
      request.on('end', () => {
        reslove(JSON.parse(body))
      })
    } catch (error) {
      console.log(err)
      reject(err)
    }
  })
}
