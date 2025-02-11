"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { acceptedVideoFiles } from "@/utils/formats"
import { FileMetadata } from "@/utils/metadata"

import CustomDropZone from "./customDropzone"
import VideoPreview from "./videoPreview"
import EditFileMetadata from "./editFileMetadata"

const CompressVideo = () => {

    // state to store the user's file
    const [videoFile, setVideoFile] = useState<FileMetadata>()

    const handleUpload = (file: File) => {
        setVideoFile({
            file: file,
            fileName: file.name,
            fileSize: file.size,
            from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
            fileType: file.type,
            isError: false
        })
    }

    return (
        <>
            <motion.div
                className="border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35"
            >
                {
                    videoFile ? (
                        <VideoPreview
                            videoURL={URL.createObjectURL(videoFile.file)}
                        />
                    ) : (
                        <CustomDropZone
                            handleUpload={handleUpload}
                            acceptedFiles={acceptedVideoFiles}
                        />
                    )
                }
            </motion.div>

            <AnimatePresence
                mode="popLayout"
            >
                <motion.div
                    className="border rounded-3xl col-span-3 flex w-full md:h-full bg-gray-50/35 p-4 relative"
                >
                    <div
                        className="flex flex-col gap-4 w-full"
                    >
                        {videoFile && (
                            <EditFileMetadata
                                videoFile={videoFile}
                                onClear={() => { }}
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default CompressVideo