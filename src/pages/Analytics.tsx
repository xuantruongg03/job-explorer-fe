import {
    GlobalJobsChart,
    GlobalSkillsChart,
    SkillsByCountry,
    VietnamJobsChart,
    VietnamSkillsChart,
} from "@/components/layouts";
import JobsTrend from "@/components/layouts/JobsTrend";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Award,
    Briefcase,
    Globe,
    MapPin,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";

const Analytics = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
                <Tabs defaultValue="jobs" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border border-purple-200 rounded-2xl py-0 items-center justify-between">
                        <TabsTrigger
                            value="jobs"
                            className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                        >
                            <Briefcase className="h-5 w-5" />
                            <span className="font-medium">Job Analysis</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="skills"
                            className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                        >
                            <Users className="h-5 w-5" />
                            <span className="font-medium">Skills Analysis</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="trends"
                            className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
                        >
                            <TrendingUp className="h-5 w-5" />
                            <span className="font-medium">Time Trends</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Enhanced Jobs Analysis Tab */}
                    <TabsContent value="jobs" className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white pb-8">
                                    <CardTitle className="flex items-center space-x-3 text-xl">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <span>Jobs in Vietnam</span>
                                    </CardTitle>
                                    <CardDescription className="text-blue-100">
                                        Distribution of job titles in Vietnamese
                                        market
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <VietnamJobsChart />
                                </CardContent>
                            </Card>

                            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white pb-8">
                                    <CardTitle className="flex items-center space-x-3 text-xl">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <Globe className="h-6 w-6" />
                                        </div>
                                        <span>Global Job Markets</span>
                                    </CardTitle>
                                    <CardDescription className="text-green-100">
                                        Job distribution in selected country
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <GlobalJobsChart />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Enhanced Skills Analysis Tab */}
                    <TabsContent value="skills" className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Globe className="h-5 w-5" />
                                        <span>Global Skills</span>
                                    </CardTitle>
                                    <CardDescription className="text-blue-100">
                                        Most demanded skills worldwide
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <GlobalSkillsChart />
                                </CardContent>
                            </Card>

                            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Star className="h-5 w-5" />
                                        <span>Vietnam Skills</span>
                                    </CardTitle>
                                    <CardDescription className="text-green-100">
                                        Top skills in Vietnamese market
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <VietnamSkillsChart />
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                <CardTitle className="flex items-center space-x-2">
                                    <Award className="h-5 w-5" />
                                    <span>Skills by Country Analysis</span>
                                </CardTitle>
                                <CardDescription className="text-purple-100">
                                    Compare skills distribution across different
                                    countries
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <SkillsByCountry />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Enhanced Time Trends Tab */}
                    <TabsContent value="trends" className="space-y-8">
                        <JobsTrend />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Analytics;
