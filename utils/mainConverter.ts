import { FFmpeg } from "@ffmpeg/ffmpeg"

import { FileMetadata, UtilitiesSettings } from "./metadata"
import { fetchFile } from "@ffmpeg/util"
import { customFormatCommand, twitterFormatCommand, whatsappFormatCommand } from "./ffmpegCommands"

export const getFileType = (filename: string) => {
    const regex = /(?:\.([^.]+))?$/
    const match = regex.exec(filename)

    if (match && match[1]) {
        return match[1]
    }

    return ""
}

export const removeFileExtension = (filename: string) => {
    const lastDotIndex = filename.lastIndexOf(".")

    if (lastDotIndex !== -1) {
        return filename.slice(0, lastDotIndex)
    }
}

type ConvertFileProps = {
    ffmpeg: FFmpeg;
    actionFile: FileMetadata;
    videoSettings: UtilitiesSettings
}

export const convertFile = async ({
    ffmpeg,
    actionFile,
    videoSettings
}: ConvertFileProps): Promise<any> => {

    const { file, fileName, fileType } = actionFile

    const output = removeFileExtension(fileName) + "." + videoSettings.videoType

    ffmpeg.writeFile(fileName, await fetchFile(file))

    const command = videoSettings.twitterFormat ?
        twitterFormatCommand(fileName, output) :
        videoSettings.whatsappFormat ?
            whatsappFormatCommand(fileName, output) :
            customFormatCommand(fileName, output, videoSettings)
    
    console.log(command.join(" "))

    await ffmpeg.exec(command)

    const data = await ffmpeg.readFile(output)
    const blob = new Blob([data], { type: fileType.split("/")[0] })
    const url = URL.createObjectURL(blob)

    return { url, output, outputBlob: blob}
} 

export const formatTime = (seconds: number) => {
    seconds = Math.round(seconds)

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    let formattedTime = ""

    if (hours > 0) {
        formattedTime += hours.toString() + "hr" 
        if (minutes > 0 || remainingSeconds > 0) {
            formattedTime += " "
        }
    }

    if (minutes > 0) {
        formattedTime += minutes.toString() + "min"
        if (remainingSeconds > 0) {
            formattedTime += " "
        }
    }

    if (remainingSeconds) {
        formattedTime += remainingSeconds.toString() + "sec"
    }

    return formattedTime
}