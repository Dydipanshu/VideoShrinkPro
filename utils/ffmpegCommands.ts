import { UtilitiesSettings, VideoFormats } from "./metadata"

export const whatsappFormatCommand = (
    input: string,
    output: string
) => [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "35",
        "-c:a",
        "aac",
        "-b:a",
        "64k",
        "-movflags",
        "faststart",
        "-maxrate",
        "1000k",
        "-bufsize",
        "1000k",
        "-fs",
        "9M",
        output
    ]

export const twitterFormatCommand = (
    input: string,
    output: string
) => [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-level:v",
        "4.2",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-movflags",
        "faststart",
        "-maxrate",
        "5000k",
        "-bufsize",
        "5000k",
        "-tune",
        "film",
        output,
    ]

export const customFormatCommand = (
    input: string,
    output: string,
    videoSettings: UtilitiesSettings
): string[] => {
    const inputType = getFileType(input)

    if (inputType === "mp4") {
        return getMP4toMP4Command(input, output, videoSettings)
    }
    else {
        switch (videoSettings.videoType) {
            case VideoFormats.MP4: return getMP4Command(input, output, videoSettings)

            case VideoFormats.AVI: return getAVICommand(input, output, videoSettings)

            case VideoFormats.MOV: return getMOVCommand(input, output, videoSettings)

            case VideoFormats.FLV: return getFLVCommand(input, output, videoSettings)

            default: return ["i", input, output]
        }
    }
}

const getMP4toMP4Command = (
    input: string,
    output: string,
    videoSettings: UtilitiesSettings
) => {
    const ffmpegCommand = [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-crf",
        "23",
        "-preset",
        "medium",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        output
    ]
    return ffmpegCommand
}

const getMP4Command = (
    input: string,
    output: string,
    videoSettings: UtilitiesSettings
) => {
    const ffmpegCommand = [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-level:v",
        "4.2",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-maxrate",
        "5000k",
        "-bufsize",
        "5000k",
        "-tune",
        "film",
        "-ss",
        videoSettings.customStartTime.toString(),
        "-to",
        videoSettings.customEndTime.toString(),
        "-q:v",
        videoSettings.quality,
        "-crf",
        "18",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-f",
        videoSettings.videoType,
    ]
    
    // extra commands if we want the audio
    if (!videoSettings.removeAudio) {
        ffmpegCommand.push(
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "faststart"
        )
    } else {
        ffmpegCommand.push("-an")
    }
    
    ffmpegCommand.push(output)
    return ffmpegCommand
}

const getMOVCommand = (
    input: string,
    output: string,
    videoSettings: UtilitiesSettings
) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"]

    const ffmpegCommand = [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-crf",
        videoSettings.quality,
        ...audioOptions,
        "-vf",
        `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
        output
    ]

    return ffmpegCommand
}

const getAVICommand = (input: string, output: string, videoSettings: UtilitiesSettings) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "mp3"];
    const ffmpegCommand = [
        "-i", input,
        "-c:v", "mpeg4",
        "-q:v", videoSettings.quality,
        ...audioOptions,
        "-vf", `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
        output
    ];
    return ffmpegCommand;
};

const getFLVCommand = (input: string, output: string, videoSettings: UtilitiesSettings) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "mp3"];
    const ffmpegCommand = [
        "-i", input,
        "-c:v", "flv1",
        "-q:v", videoSettings.quality,
        ...audioOptions,
        "-vf", `trim=start=${videoSettings.customStartTime}:end=${videoSettings.customEndTime}`,
        output
    ];
    return ffmpegCommand;
};