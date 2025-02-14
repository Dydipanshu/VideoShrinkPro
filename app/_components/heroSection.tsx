import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white text-gray-900">
            <div className="max-w-2xl">
                <p className="text-lg font-light mb-2">Want to compress your videos into the right format?</p>
                <p className="text-2xl font-semibold">You are in good hands.</p>
            </div>
            <h2 className="mt-6 text-4xl font-extrabold leading-tight max-w-3xl">
                Eliminate oversized files! Reduce video size by <span className="text-orange-500">90%</span> without sacrificing quality.
            </h2>
            <div className="mt-8">
                <Link href="/video" className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white text-lg font-medium rounded-lg shadow-md transition">
                    Click here to get started
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;