import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
    return (
        <>
            <div className=" flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center flex flex-col items-center">
                            <DotLottieReact
                                src="https://lottie.host/a01cdea6-6ef1-447c-8bc7-50910119d8c8/YgTPn6jRjL.lottie"
                                loop
                                autoplay
                                className="w-24 h-24"
                            />{" "}
                            <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center">
                                Loading
                                <span className="ml-1 flex">
                                    <span className="animate-pulse-dot-1">
                                        .
                                    </span>
                                    <span className="animate-pulse-dot-2">
                                        .
                                    </span>
                                    <span className="animate-pulse-dot-3">
                                        .
                                    </span>
                                </span>
                            </h1>
                            <p className="text-base text-gray-600">
                                Please wait while we fetch the data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Loading;
