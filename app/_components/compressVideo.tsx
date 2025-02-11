import { motion } from "framer-motion"
import CustomDropZone from "./customDropzone"
import { acceptedVideoFiles } from "@/utils/formats"

const CompressVideo = () => {

    const handleUpload = (file: File) => {

    }

  return (
    <motion.div className="border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35">
          <CustomDropZone
              handleUpload={handleUpload}
              acceptedFiles={acceptedVideoFiles}
          />
    </motion.div>
  )
}

export default CompressVideo