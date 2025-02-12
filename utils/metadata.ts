export type FileMetadata = {
    file: File;
    fileName: string;
    fileSize: number;
    from: string;
    fileType: string;
    isError?: boolean;
    url?: string;
    output?: any;
    outputBlob?: Blob;
}

export enum QualityType{
    High = "15",
    Medium = "18",
    Low = "20"
}

export enum VideoFormats {
    MP4 = "mp4",
    AVI = "avi",
    MKV = "mkv",
    MOV = "mov",
    WMV = "wmv",
    FLV = "flv",
    WEBM = "webm",
    _3GP = "3gp",
    MPEG = "mpeg",
    MTS_M2TS = "mts/m2ts",
    AVCHD = "avchd"
}

export type UtilitiesSettings = {
    quality: QualityType,
    videoType: VideoFormats,
    customStartTime: number,
    customEndTime: number,
    removeAudio: boolean,
    twitterFormat: boolean,
    whatsappFormat: boolean,
}