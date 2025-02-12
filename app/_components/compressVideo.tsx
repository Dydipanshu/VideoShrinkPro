"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { acceptedVideoFiles } from "@/utils/formats"
import { FileMetadata, QualityType, UtilitiesSettings, VideoFormats } from "@/utils/metadata"

import CustomDropZone from "./customDropzone"
import VideoPreview from "../utilities/videoPreview"
import ShowFileMetadata from "../utilities/showFileMetadata"
import VideoTrim from "../utilities/videoTrim"
import { h2 } from "framer-motion/client"
import VideoInputControl from "../utilities/videoInputControls"

const CompressVideo = () => {

    // state to store the user's file
    const [videoFile, setVideoFile] = useState<FileMetadata>()

    const [videoSettings, setVideoSettings] = useState<UtilitiesSettings>({
        quality: QualityType.High,
        videoType: VideoFormats.MP4,
        customStartTime: 0,
        customEndTime: 0,
        removeAudio: false,
        twitterFormat: false,
        whatsappFormat: false
    })

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
                        {
                            videoFile ? (
                                <>
                                    <ShowFileMetadata
                                        videoFile={videoFile}
                                        onClear={() => { }}
                                    />
                                    <VideoTrim
                                        disabled={false}
                                        onVideoSettingsChange={setVideoSettings}
                                        videoSettings={videoSettings}
                                    />
                                    <VideoInputControl
                                        disabled={false}
                                        onVideoSettingsChange={setVideoSettings}
                                        videoSettings={videoSettings}
                                    />
                                </>
                            ) : (
                                <h2 className="font-medium text-center my-auto">
                                    Select a video to start
                                </h2>
                            )
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default CompressVideo