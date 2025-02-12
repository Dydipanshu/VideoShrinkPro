"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"

import { acceptedVideoFiles } from "@/utils/formats"
import {
    FileMetadata,
    QualityType,
    UtilitiesSettings,
    VideoFormats
} from "@/utils/metadata"

import CustomDropZone from "./customDropzone"

import VideoPreview from "../utilities/videoPreview"
import ShowFileMetadata from "../utilities/showFileMetadata"
import VideoTrim from "../utilities/videoTrim"
import VideoInputControl from "../utilities/videoInputControls"
import { Button } from "@/components/ui/button"

const CompressVideo = () => {

    // state to store the user's file
    const [videoFile, setVideoFile] = useState<FileMetadata>()

    // state to keep track of compression
    const [progress, setProgress] = useState<number>(0)
    const [time, setTime] = useState<{
        startTime?: number,
        elapsedSeconds?: number
    }>({
        elapsedSeconds: 0
    })
    const [status, setStatus] = useState<"notStarted" | "converting" | "converted">("notStarted")

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

    // FFmpeg configurations
    const ffmpegRef = useRef(new FFmpeg())

    const disabledDuringCompression = status === "converting"

    const load = async () => {
        const ffmpeg = ffmpegRef.current
        await ffmpeg.load({
            coreURL: await toBlobURL(
                `http://localhost:3000/download/ffmpeg-core.js`,
                "text/javascript"
            ),
            wasmURL: await toBlobURL(
                `http://localhost:3000/download/ffmpeg-core.wasm`,
                "application/wasm"
            )
        })
    }

    const currentStatus = () => {
        toast.promise(load, {
            loading: "Downloading necessary packages from FFmpeg for offline use",
            success: () => {
                return "All necessary packages downloading completed"
            },
            error: "Error loading FFmpeg packages"
        })
    }

    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            currentStatus();
            hasRun.current = true;
        }
    }, []);


    return (
        <>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                key={"drag"}
                transition={{ type: "tween" }}
                className="border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35"
                layout
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
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    key={"drag"}
                    transition={{ type: "tween" }}
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
                                        disabled={disabledDuringCompression}
                                        onVideoSettingsChange={setVideoSettings}
                                        videoSettings={videoSettings}
                                    />
                                    <VideoInputControl
                                        disabled={disabledDuringCompression}
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
                        <motion.div
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            key={"button"}
                            transition={{ type: "tween" }}
                            className="'rounded-2xl p-3 h-fit m-auto"
                        >
                            {
                                (status === "notStarted" || status === "converting")
                                &&
                                (
                                    <Button
                                        variant="default"
                                        onClick={() => { }}
                                    >
                                        Compress Video
                                    </Button>
                                )
                            }
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default CompressVideo