import Image from "next/image";

const DemoVideo = () => {
    return (
        <div id="px-6 relative">
            <Image
                width={400}
                height={700}
                src={"/demo.gif"}
                alt="Demo"
                className="h-full w-full rounded-2xl object-cover border-8 overflow-clip"
            />
        </div>
    )
}

export default DemoVideo