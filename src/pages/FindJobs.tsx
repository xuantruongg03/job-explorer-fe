import { JobMatch } from "@/components/features";
import { Loading } from "@/components/layouts";
import analyzeService from "@/services/analyze";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Globe, Search, Target } from "lucide-react";

function FindJobs() {
    const { isLoading, data } = useQuery({
        queryKey: ["countries"],
        queryFn: () => analyzeService.getCountries(),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl">
                                <Search className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                            Find Your{" "}
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Dream Job
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover personalized job opportunities in Vietnam's
                            dynamic job market. Match your skills with the
                            perfect career opportunities.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mb-4">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Smart Matching
                            </h3>
                            <p className="text-gray-600">
                                Our AI analyzes your skills and matches you with
                                the most relevant job opportunities.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl w-fit mb-4">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Quality Jobs
                            </h3>
                            <p className="text-gray-600">
                                Access thousands of verified job positions from
                                top companies across Vietnam.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl w-fit mb-4">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Global Reach
                            </h3>
                            <p className="text-gray-600">
                                Explore opportunities not just in Vietnam but
                                across Southeast Asia and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Matching Section */}
            <div className="relative">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Start Your Job Search
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Enter your skills and let us find the perfect
                                job matches for you
                            </p>
                        </div>

                        <JobMatch countries={data?.data || []} />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                                50K+
                            </div>
                            <div className="text-gray-600">Active Jobs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                5K+
                            </div>
                            <div className="text-gray-600">Companies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                                200K+
                            </div>
                            <div className="text-gray-600">Job Seekers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                                95%
                            </div>
                            <div className="text-gray-600">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindJobs;
