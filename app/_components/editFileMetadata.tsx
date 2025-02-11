import { motion } from 'framer-motion'

import { FileMetadata } from "@/utils/metadata"
import { Button } from '@/components/ui/button';
import { bytesToSize } from '@/utils/bytesToSize';

const EditFileMetadata = ({
  videoFile,
  onClear
}: {
  videoFile: FileMetadata;
  onClear: () => void;
  }) => {
  
  return (
    <motion.div
      className='rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200'
    >
      <div
        className='text-sm'
      >
        <div
          className='flex justify-between items-center gap-36 border-b mb-2 pb-2'
        >
          <p>
            File Input
          </p>
          <Button
            onClick={onClear}
          >
            Clear
          </Button>
        </div>
        <p
          className='border-b mb-2 pb-2'
        >
          {videoFile?.fileName}
        </p>
        <div
          className='flex justify-between items-center'
        >
          <p>File Size</p>
          <p>{ bytesToSize(videoFile.fileSize) }</p>
        </div>
      </div>
    </motion.div>
  )
}

export default EditFileMetadata