const fs = require('fs')
function uploadAvatar(req, res) {
  const userId = req.body.userId
  const file = req.files.file
  const fileExtension = file.name.split('.')[1]
  const path = __dirname + '/../../uploads/avatars/' + userId + '.' + fileExtension
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  fs.appendFileSync(path, file.data, (err) => {
    if (err) {
      console.log(err)
    }
  });

  res.send(file)
}

module.exports = { uploadAvatar }