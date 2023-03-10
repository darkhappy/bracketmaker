const fs = require('fs')
const userController = require('./UserController')
const { dirname } = require('path')

/**
 *
 * @param req: requête http
 * @param res: réponse http
 * @description: Upload l'avatar de l'utilisateur
 * @return: La réponse si la requête a réussi (200 ou 204) ou non (400 ou 401)
 */
function uploadAvatar (req, res) {
  const file = req.files.img

  if (!file || file.length === 0) {
    return res.status(422).send('No files were uploaded.')
  }
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
    console.log('File format is not supported')
    return res.status(415).send('File format is not supported')
  }
  if (file.size > 2000000) {
    console.log('File size is too big')
    return res.status(413).send('File size is too big')
  }

  const id = file.name.split('.')[0]
  const path = dirname(require.main.filename) + '/assets/avatars/' + file.name
  if (fs.existsSync(path)) {
    fs.writeFileSync(path, file.data, (err) => {
      if (err) {
        console.log(err)
      }
    })
  } else {
    fs.appendFileSync(path, file.data, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  userController.updateAvatar(id, file.name)
  return res.status(200).send('File uploaded')
}

module.exports = { uploadAvatar }
