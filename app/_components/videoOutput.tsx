import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react';

import { FileMetadata } from "@/utils/metadata"
import {
    calculateBlobSize,
    reducedSize
} from '@/utils/bytesToSize';
import { formatTime } from '@/utils/mainConverter';

import { Button } from '@/components/ui/button';

type VideoOutputProps = {
    videoFile: FileMetadata;
    timeTaken: number;
}

const VideoOutput = ({
    videoFile,
    timeTaken
}: VideoOutputProps) => {

    const outputFileSize = calculateBlobSize(videoFile.outputBlob)

    const { sizeReduced, percentage } = reducedSize(
        videoFile.fileSize,
        videoFile.outputBlob
    )

    const download = () => {
        if (!videoFile.url) return

        const a = document.createElement("a")
        a.style.display = "none"
        a.href = videoFile.url
        a.download = videoFile.output
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(videoFile.url)
        document.body.removeChild(a)
    }

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            key={"output"}
            transition={{ type: "tween" }}
            className='rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200'
        >
            <div className='text-sm'>
                <div className='flex justify-between items-center border-b mb-2 pb-2'>
                    <div className='flex items-center gap-1'>
                        <p>
                            Output File
                        </p>
                        <BadgeCheck
                            className='text-white rounded-full'
                            fill='#000000'
                        />
                    </div>
                    <Button
                        onClick={download}
                    >
                        Download Video
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b mb-2 pb-2'>
                    <p className='font-semibold'>
                        New File Size
                    </p>
                    <p>
                        {outputFileSize}
                    </p>
                </div>
                <div className='flex justify-between items-center border-b mb-2 pb-2'>
                    <p className='font-semibold'>
                        File Size Reduced %
                    </p>
                    <p>
                        {percentage}
                    </p>
                </div>
                <div className='flex justify-between items-center border-b mb-2 pb-2'>
                    <p className='font-semibold'>
                        Original File Size
                    </p>
                    <p>
                        {videoFile.fileSize}
                    </p>
                </div>
                <div className='flex justify-between items-center border-b mb-2 pb-2'>
                    <p className='font-semibold'>
                        File Size Reduced
                    </p>
                    <p>
                        {sizeReduced}
                    </p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='font-semibold'>
                        Time Taken
                    </p>
                    <p>
                        {timeTaken ? formatTime(timeTaken / 1000) : "-"}
                    </p>
                </div>
            </div>
        </motion.div>
    )

}

export default VideoOutput