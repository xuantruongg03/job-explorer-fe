import { Loading } from "@/components/layouts";
import EmptyState from "@/components/layouts/EmptyState";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import analyzeService from "@/services/analyze";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, BookOpen, Briefcase, Filter, Search, Star, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";

const getSkillSearch = async (params: { skill_name: string; country: string }) => {
    const response = await analyzeService.getSkillsByJobAndCountry({
        job_title: params.skill_name,
        country: params.country,
        limit: 15,
    });
    return response;
};

function SearchSkills() {
    const [skillName, setSkillName] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("Việt Nam");
    
    const debouncedInputValue = useDebounce(skillName, 1000);

    const { isLoading, data: countries } = useQuery({
        queryKey: ["countries"],
        queryFn: () => analyzeService.getCountries(),
        refetchOnWindowFocus: false,
    });

    const { isLoading: isLoadingSearch, isError, data: skillSearchData } = useQuery({
        queryKey: ["skillSearch", debouncedInputValue, selectedCountry],
        queryFn: () =>
            getSkillSearch({
                skill_name: debouncedInputValue,
                country: selectedCountry,
            }),
        refetchOnWindowFocus: false,
        enabled: !!debouncedInputValue && !!selectedCountry,
    });

    const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkillName(e.target.value.trim());
    };    
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen pt-32 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                        Search Skills
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover the most in-demand skills in Vietnam's and the global job market.
                        Analyze skill trends, demand patterns, and career opportunities.
                    </p>
                </div>

                {/* Enhanced Search Form */}
                <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl mb-12">
                    <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-3xl">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                            <Search className="h-7 w-7" />
                            Skill Search & Analysis
                        </CardTitle>
                        <CardDescription className="text-blue-100 text-lg">
                            Enter a skill name to discover market insights and trends
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Job Name
                                </label>
                                <Input
                                    value={skillName}
                                    onChange={handleSkillChange}
                                    placeholder="e.g., Software Engineer, Sale, Data Scientist,..."
                                    className="h-12 text-lg rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white shadow-sm"
                                />
                            </div>
                            <div className="md:w-72 space-y-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Country
                                </label>
                                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                    <SelectTrigger className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-purple-500 bg-white shadow-sm">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries?.data?.map((country: string) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>                        </div>
                    </CardContent>
                </Card>

                {/* Content */}
                {isLoadingSearch ? (
                    <div className="space-y-8">
                        {/* Loading Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="bg-white/80 backdrop-blur-lg border-0 shadow-lg rounded-2xl">
                                    <CardContent className="p-6">
                                        <Skeleton className="h-20 w-full rounded-xl" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Loading Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg rounded-2xl">
                                <CardContent className="p-6">
                                    <Skeleton className="h-96 w-full rounded-xl" />
                                </CardContent>
                            </Card>
                            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg rounded-2xl">
                                <CardContent className="p-6">
                                    <Skeleton className="h-96 w-full rounded-xl" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : !skillName.trim() ? (
                    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-16 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-12 w-12 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Start Your Skill Discovery
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Enter a skill name above to explore market demand, trends, and opportunities in Vietnam's job market.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : skillSearchData?.data?.top_skills.length === 0 ? (
                    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-16">
                            <EmptyState message="No data available for the searched skill and country. Try a different skill or country." />
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-12">
                        {/* Enhanced Statistics Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-6 relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="bg-white/20 rounded-full p-3">
                                                <Briefcase className="h-7 w-7" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold">{skillSearchData?.data?.total_jobs || 0}</div>
                                                <div className="text-blue-100 text-sm">Related Jobs</div>
                                            </div>
                                        </div>
                                        <p className="text-blue-100 text-sm">Job opportunities found</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-6 relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="bg-white/20 rounded-full p-3">
                                                <Star className="h-7 w-7" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold">{skillSearchData?.data?.top_skills.length || 0}</div>
                                                <div className="text-emerald-100 text-sm">Skill Variations</div>
                                            </div>
                                        </div>
                                        <p className="text-emerald-100 text-sm">Different skill combinations</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-violet-500 to-violet-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-6 relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="bg-white/20 rounded-full p-3">
                                                <TrendingUp className="h-7 w-7" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold">
                                                    {skillSearchData?.data?.top_skills[0]?.frequency > 100 ? 'High' : 
                                                     skillSearchData?.data?.top_skills[0]?.frequency > 50 ? 'Medium' : 'Low'}
                                                </div>
                                                <div className="text-violet-100 text-sm">Market Demand</div>
                                            </div>
                                        </div>
                                        <p className="text-violet-100 text-sm">Current market status</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-6 relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="bg-white/20 rounded-full p-3">
                                                <Filter className="h-7 w-7" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold">{selectedCountry}</div>
                                                <div className="text-pink-100 text-sm">Search Location</div>
                                            </div>
                                        </div>
                                        <p className="text-pink-100 text-sm">Analysis region</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>                        {/* Enhanced Skills Analysis Charts */}
                        <div className="mb-12">
                            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8">                                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                        <BarChart3 className="h-8 w-8" />
                                        Skill Demand Analysis (Top 20)
                                    </CardTitle>
                                    <CardDescription className="text-blue-100 text-lg">
                                        Distribution of top skills with "Other" category for remaining skills
                                    </CardDescription>
                                </CardHeader>                                <CardContent className="p-8">
                                    <ResponsiveContainer width="100%" height={500}>
                                        <PieChart>
                                            <Pie
                                                data={(() => {
                                                    const topSkills = skillSearchData?.data?.top_skills.slice(0, 20) || [];
                                                    const totalTopFrequency = topSkills.reduce((sum: number, skill: any) => sum + skill.frequency, 0);
                                                    const totalFrequency = skillSearchData?.data?.total_jobs || 1;
                                                    const otherFrequency = Math.max(0, totalFrequency - totalTopFrequency);
                                                    const otherPercentage = ((otherFrequency / totalFrequency) * 100).toFixed(1);
                                                    
                                                    const result = [...topSkills];
                                                    if (otherFrequency > 0) {
                                                        result.push({
                                                            skill: 'Other',
                                                            frequency: otherFrequency,
                                                            percentage: parseFloat(otherPercentage)
                                                        });
                                                    }
                                                    return result;
                                                })()}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ skill, percentage }) => `${skill}: ${percentage}%`}
                                                outerRadius={160}
                                                fill="#8884d8"
                                                dataKey="frequency"
                                            >
                                                {(() => {
                                                    const topSkills = skillSearchData?.data?.top_skills.slice(0, 20) || [];
                                                    const totalTopFrequency = topSkills.reduce((sum: number, skill: any) => sum + skill.frequency, 0);
                                                    const totalFrequency = skillSearchData?.data?.total_jobs || 1;
                                                    const otherFrequency = Math.max(0, totalFrequency - totalTopFrequency);
                                                    
                                                    const colors = [
                                                        '#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981', 
                                                        '#f59e0b', '#ef4444', '#6366f1', '#14b8a6', '#f97316',
                                                        '#8b5a3c', '#7c3aed', '#dc2626', '#059669', '#2563eb',
                                                        '#7c2d12', '#991b1b', '#166534', '#1e40af', '#92400e'
                                                    ];
                                                    
                                                    const result = topSkills.map((entry: any, index: number) => (
                                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                    ));
                                                    
                                                    if (otherFrequency > 0) {
                                                        result.push(<Cell key="cell-other" fill="#9ca3af" />);
                                                    }
                                                    
                                                    return result;
                                                })()}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "rgba(255,255,255,0.95)",
                                                    border: "none",
                                                    borderRadius: "16px",
                                                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                                    padding: "16px"
                                                }}
                                                formatter={(value: any, name: any, props: any) => [
                                                    `${value} occurrences (${props.payload.percentage}%)`,
                                                    props.payload.skill,
                                                ]}
                                            />
                                            <Legend 
                                                verticalAlign="bottom" 
                                                height={80}
                                                wrapperStyle={{
                                                    paddingTop: '20px',
                                                    fontSize: '12px'
                                                }}
                                                formatter={(value: string) => 
                                                    value.length > 20 ? value.substring(0, 20) + "..." : value
                                                }
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>                                </CardContent>
                            </Card>
                        </div>{/* Enhanced Detailed Skills Results */}
                        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-3xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8">
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    <BookOpen className="h-8 w-8" />
                                    Detailed Search Results
                                </CardTitle>
                                <CardDescription className="text-indigo-100 text-lg">
                                    Comprehensive breakdown of skills related to "{skillName}" in {selectedCountry}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                                    {skillSearchData?.data?.top_skills.map((skill: any, index: number) => (
                                        <div
                                            key={skill.skill}
                                            className="group flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                                        >
                                            <div className="flex items-center space-x-6">
                                                <div className="relative">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg">
                                                        {index + 1}
                                                    </div>
                                                    {index < 3 && (
                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                                            <Star className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                        {skill.skill}
                                                    </h4>
                                                    <p className="text-gray-600 flex items-center gap-2">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Briefcase className="w-4 h-4" />
                                                            Found in {skill.frequency} job postings
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-blue-600 font-semibold">
                                                            Rank #{skill.rank || index + 1}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                                    {skill.percentage}%
                                                </div>
                                                <div className="text-sm text-gray-500 font-medium">
                                                    market share
                                                </div>
                                                <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                                                        style={{ width: `${Math.min(skill.percentage, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Summary Footer */}
                                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">{skillSearchData?.data?.total_jobs}</div>
                                            <div className="text-sm text-gray-600">Total Jobs Analyzed</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-indigo-600">{skillSearchData?.data?.top_skills.length}</div>
                                            <div className="text-sm text-gray-600">Unique Skills Found</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600">{selectedCountry}</div>
                                            <div className="text-sm text-gray-600">Analysis Region</div>
                                        </div>
                                    </div>
                                </div>                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchSkills;