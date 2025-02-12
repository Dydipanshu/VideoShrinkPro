import Image from 'next/image';
import { motion } from 'framer-motion'

import {
    QualityType,
    UtilitiesSettings,
    VideoFormats
} from "@/utils/metadata";

import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectTrigger
} from '@/components/ui/select';

type VideoInputControlProps = {
    videoSettings: UtilitiesSettings;
    onVideoSettingsChange: (value: UtilitiesSettings) => void;
    disabled: boolean
}

const VideoInputControl = ({
    videoSettings,
    onVideoSettingsChange,
    disabled,
}: VideoInputControlProps) => {

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            key={"drag"}
            transition={{ type: "tween" }}
            className='rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200'
        >
            <div
                className='text-sm'
            >
                <div
                    className='flex justify-between items-center border-b mb-2 pb-2'
                >
                    <p>
                        Remove Audio
                    </p>
                    <Switch
                        disabled={disabled}
                        onCheckedChange={(value: boolean) => {
                            onVideoSettingsChange({
                                ...videoSettings,
                                removeAudio: value
                            })
                        }}
                        checked={videoSettings.removeAudio}
                    />
                </div>
                <div
                    className='flex justify-between items-center border-b mb-2 pb-2'
                >
                    <p>
                        Compress for Twitter &nbsp;
                        <Image src={"twitter.svg"} alt='' width={20} height={20} className='inline' />
                    </p>
                    <Switch
                        disabled={disabled}
                        onCheckedChange={(value: boolean) => {
                            onVideoSettingsChange({
                                ...videoSettings,
                                twitterFormat: value
                            })
                        }}
                        checked={videoSettings.twitterFormat}
                    />
                </div>
                <div
                    className='flex justify-between items-center border-b mb-2 pb-2'
                >
                    <p>
                        Compress for WhatsApp &nbsp;
                        <Image src={"whatsapp.svg"} alt='' width={20} height={20} className='inline' />
                    </p>
                    <Switch
                        disabled={disabled}
                        onCheckedChange={(value: boolean) => {
                            onVideoSettingsChange({
                                ...videoSettings,
                                whatsappFormat: value
                            })
                        }}
                        checked={videoSettings.whatsappFormat}
                    />
                </div>
                {
                    !videoSettings.twitterFormat && !videoSettings.whatsappFormat && (
                        <>
                            <div
                                className='flex justify-between items-center border-b mb-2 pb-2'
                            >
                                <p>
                                    Quality
                                </p>
                                <Select
                                    disabled={disabled}
                                    value={videoSettings.quality}
                                    onValueChange={(value: string) => {
                                        const quality = value as QualityType
                                        onVideoSettingsChange({
                                            ...videoSettings,
                                            quality
                                        })
                                    }}
                                >
                                    <SelectTrigger className='w-[100px] text-sm'>
                                        <SelectValue placeholder="Select Quality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {quality.map((q) => (
                                            <SelectItem
                                                value={q.value}
                                                key={q.value}
                                            >
                                                {q.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )
                }
                {
                    !videoSettings.twitterFormat && !videoSettings.whatsappFormat && (
                        <>
                            <div
                                className='flex justify-between items-center border-b mb-2 pb-2'
                            >
                                <p>
                                    Video Formats
                                </p>
                                <Select
                                    disabled={disabled}
                                    value={videoSettings.videoType}
                                    onValueChange={(value: string) => {
                                        const videoType = value as VideoFormats
                                        onVideoSettingsChange({
                                            ...videoSettings,
                                            videoType
                                        })
                                    }}
                                >
                                    <SelectTrigger className='w-[120px] text-sm'>
                                        <SelectValue placeholder="Select Video Format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {format.map((q) => (
                                            <SelectItem
                                                value={q.value}
                                                key={q.value}
                                            >
                                                {q.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )
                }
            </div>
        </motion.div>
    )
}

const quality: { label: string, value: QualityType }[] = [
    {
        label: "High",
        value: QualityType.High
    },
    {
        label: "Medium",
        value: QualityType.Medium
    },
    {
        label: "Low",
        value: QualityType.Low
    }
]

const format: { label: string, value: VideoFormats }[] = [
    { label: "MP4 (.mp4)", value: VideoFormats.MP4 },
    { label: "AVI (.avi)", value: VideoFormats.AVI },
    { label: "MKV (.mkv)", value: VideoFormats.MKV },
    { label: "MOV (.mov)", value: VideoFormats.MOV },
    { label: "WMV (.wmv)", value: VideoFormats.WMV },
    { label: "FLV (.flv)", value: VideoFormats.FLV },
    { label: "WEBM (.webm)", value: VideoFormats.WEBM },
    { label: "3GP (.3gp)", value: VideoFormats._3GP },
    { label: "MPEG (.mpeg)", value: VideoFormats.MPEG },
    { label: "MTS/M2TS (.mts/m2ts)", value: VideoFormats.MTS_M2TS },
    { label: "AVCHD (.avchd)", value: VideoFormats.AVCHD }
]

export default VideoInputControl