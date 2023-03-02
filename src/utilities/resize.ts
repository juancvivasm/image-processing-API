import sharp from 'sharp'

const resize = async (
    sourceFile: string,
    newFile: string,
    mWidth: number,
    mHeight: number
): Promise<boolean> => {
    try {
        await sharp(sourceFile)
            .resize({
                width: mWidth,
                height: mHeight,
            })
            .toFormat('jpeg', { mozjpeg: true })
            .toFile(newFile)
        return true
    } catch (error) {
        return false
    }
}

export default {
    resize,
}
