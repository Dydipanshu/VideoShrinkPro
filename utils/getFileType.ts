const getFileType = (filename: string) => {
    const regex = /(?:\.([^.]+))?$/
    const match = regex.exec(filename)

    if (match && match[1]) {
        return match[1]
    }
}