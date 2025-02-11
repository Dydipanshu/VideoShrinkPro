const VideoPreview = ({
    videoURL
}: { videoURL: string }) => {
    return (
        <video
            id="compress-video-player"
            controls
            autoPlay
            loop
            className="h-full w-full rounded-3xl"
        >
            <source src={videoURL} type="video/mp4" />
        </video>
    )
}

export default VideoPreview