import express from 'express'
import fs from 'fs'
import resize from './resize'

const dir = 'images/'
const outDir = 'thumb/'

const thumb = async (
    req: express.Request,
    res: express.Response,
    next: () => void
): Promise<void> => {
    const lFilename = req.query.filename
    const lWidth = req.query.width as unknown as number
    const lHeight = req.query.height as unknown as number

    if (!lFilename) {
        res.status(400).send('The file name must not be empty.')
        return
    }

    if (Number.isNaN(Number(lWidth))) {
        res.status(400).send('Width must be a valid value.')
        return
    }

    if (lWidth <= 0) {
        res.status(400).send('Width must be greater than 0.')
        return
    }

    if (Number.isNaN(Number(lHeight))) {
        res.status(400).send('Height must be a valid value.')
        return
    }

    if (lHeight <= 0) {
        res.status(400).send('Height must be greater than 0.')
        return
    }

    const sourceFile = dir.concat(lFilename as string).concat('.jpg')
    if (!fs.existsSync(sourceFile)) {
        res.status(404).send('File Not Found!')
        return
    }

    const newFile = outDir
        .concat(lFilename as string)
        .concat('-')
        .concat(lWidth.toString())
        .concat('x')
        .concat(lHeight.toString())
        .concat('-resized-compressed.jpeg')

    if (!fs.existsSync(newFile)) {
        await resize.resize(
            sourceFile,
            newFile,
            Number(lWidth),
            Number(lHeight)
        )
    }

    next()
}

export default thumb
