import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`
    cb(null, `${uniqueSuffix}`)
  }
})

const limits = {
  fileSize: 10 * 1024 * 1024
}

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif/
  const mimeType = allowedTypes.test(file.mimetype)
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase())

  if (mimeType && extName) {
    cb(null, true)
  }
}

const upload = multer({ 
  storage,
  limits,
  fileFilter
})

export default upload
