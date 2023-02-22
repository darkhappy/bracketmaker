const fs = require('fs')
function uploadAvatar(req, res) {
  const file = req.files.img
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return error
  }

  const path = __dirname + '/../assets/avatars/' + file.name

  fs.appendFile(path, file.data, (err) => {
    if (err) {
      console.log(err)
    }
  });

  res.send(path)
}

module.exports = { uploadAvatar }