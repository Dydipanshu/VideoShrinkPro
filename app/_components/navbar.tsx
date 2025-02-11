import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-6 lg:left-8 right-6 lg:right-8 py-6 lg:pt-8 pb-0 z-30">
            <div className="w-full border border-gray-200 p-3 lg:p-4 max-w-5xl bg-gray-50/90 backdrop-blur-lg sm:grid flex justify-between sm:grid-cols-3 items-center mx-auto rounded-2xl">
                <Link href="/" className="flex flex-row items-center gap-2">
                    <Image src={"logo.svg"} alt="Logo" width={40} height={40} />
                    <p className="font-semibold sm:text-xl bg-gradient-to-r from-gray-500 via-black to-orange-500 text-transparent bg-clip-text">
                        VideoShrinkPro
                    </p>
                </Link>
                <div className="sm:flex gap-4 items-center" />
                <div className="flex justify-end items-center">
                    <Button>
                        <Link href={"/video"}>
                            Compress Now
                        </Link>
                    </Button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar