"use client"

import { useState } from 'react';
import ReactDropZone from 'react-dropzone'
import { toast } from 'sonner';

import { Input } from "@/components/ui/input"
import Image from 'next/image';

type CustomDropZoneProps = {
    handleUpload: (files: File) => void;
    acceptedFiles: { [key: string]: string[] };
    disabled?: boolean;
}

const CustomDropZone = ({
    handleUpload,
    acceptedFiles,
    disabled
}: CustomDropZoneProps) => {

    const [ isHover, setIsHover ] = useState(false)

    const handleHover = (): void => setIsHover(true)
    const handleExitHover = (): void => setIsHover(false)

    const onDrop = (files: File[]) => {
        handleUpload(files[0])
        handleExitHover()
    }

    const onError = () => {
        handleExitHover()
        toast.error("Some error occured while uploading your file(s)", {
            description: "Supported formats: Audio, Video and Images",
            duration: 3000
        })
    }
    
    const onDropRejected = () => {
        handleExitHover()
        toast.error("Some error occured while uploading your file(s)", {
            description: "Supported formats: Audio, Video and Images",
            duration: 3000
        })
    }

    return (

        <ReactDropZone
            disabled={disabled}
            onDragEnter={handleHover}
            onDragLeave={handleExitHover}
            onDrop={onDrop}
            accept={acceptedFiles}
            multiple={false}
            onError={onError}
            onDropRejected={onDropRejected}
        >
            {({ getRootProps, getInputProps }) => (
                <div
                    {...getRootProps()}
                    className={`${isHover ? "border-black bg-gray-100/80" : "border-default-gray"} flex justify-center items-center flex-col cursor-pointer w-full p-6 ${disabled ? "cursor-not-allowed" : ""}`}
                >
                    <Input
                        {...getInputProps()}
                    />
                    <Image src={"video.svg"} alt='Video' width={100} height={100}/>
                    <h3
                        className='text-center mt-5'
                    >
                        Select or Drop the video you want to compress
                    </h3>
                </div>
            )}
        </ReactDropZone>
    )
}

export default CustomDropZone