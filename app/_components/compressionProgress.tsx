import { Progress } from "@/components/ui/progress"
import { formatTime } from "@/utils/mainConverter"
import { Loader } from "lucide-react"

const CompressionProgress = ({
    progress,
    seconds
}: {
    progress: number,
    seconds: number
}) => {
    return (
        <div
            className="flex justify-between items-center gap-2 p-0.5 m-2"
        >
            <div
                className="flex-1"
            >
                <div
                    className="flex justify-between text-sm mb-2"
                >
                    <div
                        className="flex gap-2 items-center"
                    >
                        {
                            progress ? (
                                <p> Compressing </p>
                            ) : (
                                <p> Compressing </p>
                            )
                        }
                        <Loader className="animate-spin w-4 h-4" />
                    </div>
                    <p>
                        {/* FIXME: Time elapsed not showing */}
                        {formatTime(seconds/1000)}
                    </p>
                </div>
                <Progress value={progress} />
            </div>
        </div>
    )
}

export default CompressionProgress