import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, BarChart3, ArrowLeft } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
            <div className="max-w-2xl flex justify-center flex-col text-center">
                <div className="">
                    <DotLottieReact
                        src="https://lottie.host/a0b81963-7a73-40fa-8061-e286b2e5f75e/Y4P3AClWJu.lottie"
                        loop
                        autoplay
                        className="w-full h-44 md:h-72 mx-auto"
                    />
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                        The page you're looking for doesn't exist in our job
                        market explorer.
                    </p>
                    <p className="text-sm text-gray-500">
                        Path:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">
                            {location.pathname}
                        </code>
                    </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        <Link to="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/analytics">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Explore Data
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
