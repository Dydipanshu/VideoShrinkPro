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