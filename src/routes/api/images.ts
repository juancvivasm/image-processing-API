import express from 'express'
import fs from 'fs'
import thumb from '../../utilities/thumb'

const images = express.Router()
const outDir = 'thumb/'

images.get('/', thumb, (req: express.Request, res: express.Response) => {
    const lFilename = req.query.filename
    const lWidth = req.query.width as unknown as number
    const lHeight = req.query.height as unknown as number

    const newFile = outDir
        .concat(lFilename as string)
        .concat('-')
        .concat(lWidth.toString())
        .concat('x')
        .concat(lHeight.toString())
        .concat('-resized-compressed.jpeg')
    res.contentType('image/jpeg')
    fs.readFile(newFile, function (err, content) {
        res.end(content)
    })
})

export default images
