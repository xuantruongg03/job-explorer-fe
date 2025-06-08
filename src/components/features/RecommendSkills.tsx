import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import analyzeService from "@/services/analyze";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/layouts/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Star, Target, Globe } from "lucide-react";
import { CONSTANTS } from "@/lib/constant";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const getSkillReq = async (params: { job_title: string; country: string }) => {
    const response = await analyzeService.getSkillsByJobAndCountry({
        job_title: params.job_title,
        country: params.country,
        limit: 10,
    });
    return response;
};

interface RecommendSkillsProps {
    countries: string[];
}

const RecommendSkills = React.memo(({ countries }: RecommendSkillsProps) => {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("Việt Nam");

    const debouncedInputValue = useDebounce(jobTitle, 500);

    const { isLoading, isError, data } = useQuery({
        queryKey: ["skillStatistics", debouncedInputValue, selectedCountry],
        queryFn: () =>
            getSkillReq({
                job_title: debouncedInputValue,
                country: selectedCountry,
            }),
        refetchOnWindowFocus: false,
        enabled: !!debouncedInputValue && !!selectedCountry,
    });

    console.log("Skill Statistics Data:", data);

    const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobTitle(e.target.value.trim());
    };

    return (
        <>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Job Title
                    </label>
                    <Input
                        value={jobTitle}
                        onChange={handleJobChange}
                        placeholder="Enter job title"
                        className="w-full h-12 rounded-xl border-2 border-orange-200 focus:border-orange-500 bg-white/80"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Country
                    </label>
                    <Select
                        value={selectedCountry}
                        onValueChange={setSelectedCountry}
                    >
                        <SelectTrigger className="w-full h-12 rounded-xl border-2 border-orange-200 focus:border-orange-500 bg-white/80">
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton
                                key={i}
                                className="h-24 w-full rounded-xl"
                            />
                        ))}
                    </div>

                    {/* Charts Loading */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Skeleton className="h-96 w-full rounded-2xl" />
                        <Skeleton className="h-96 w-full rounded-2xl" />
                    </div>

                    {/* Table Loading */}
                    <div className="mt-8">
                        <Skeleton className="h-96 w-full rounded-2xl" />
                    </div>
                </>
            ) : !data?.data || data.data?.top_skills.length === 0 ? (
                <EmptyState message="No skill statistics available for the selected job and country" />
            ) : (
                <>
                    {/* Statistics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {" "}
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-100">
                                            Total Jobs
                                        </p>
                                        <h3 className="text-2xl font-bold">
                                            {data.data?.total_jobs || 0}
                                        </h3>
                                    </div>
                                    <Briefcase className="h-8 w-8 text-blue-200" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-100">
                                            Unique Skills
                                        </p>
                                        <h3 className="text-2xl font-bold">
                                            {data.data?.total_unique_skills ||
                                                data.data?.top_skills.length ||
                                                0}
                                        </h3>
                                    </div>
                                    <Star className="h-8 w-8 text-green-200" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-100">
                                            Job Title
                                        </p>
                                        <h3 className="text-lg font-bold truncate">
                                            {data.data?.job_title ||
                                                jobTitle ||
                                                "N/A"}
                                        </h3>
                                    </div>
                                    <Target className="h-8 w-8 text-purple-200" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-orange-100">
                                            Country
                                        </p>
                                        <h3 className="text-lg font-bold">
                                            {data.data?.country ||
                                                selectedCountry}
                                        </h3>
                                    </div>
                                    <Globe className="h-8 w-8 text-orange-200" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Top Skills Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                <CardTitle className="text-lg">
                                    Top Skills Distribution
                                </CardTitle>
                                <CardDescription className="text-indigo-100">
                                    Most frequently required skills (Top 10)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                {" "}
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart
                                        data={data.data?.top_skills.slice(
                                            0,
                                            10
                                        )}
                                        layout="horizontal"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="skillStatsGradient"
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="0"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#6366f1"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#8b5cf6"
                                                    stopOpacity={0.4}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e0e7ff"
                                        />
                                        <XAxis
                                            type="number"
                                            tick={{
                                                fontSize: 11,
                                            }}
                                        />
                                        <YAxis
                                            dataKey="skill"
                                            type="category"
                                            width={120}
                                            tick={{
                                                fontSize: 10,
                                            }}
                                            tickFormatter={(value) =>
                                                value.length > 15
                                                    ? value.substring(0, 15) +
                                                      "..."
                                                    : value
                                            }
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    "rgba(255,255,255,0.95)",
                                                border: "none",
                                                borderRadius: "12px",
                                                boxShadow:
                                                    "0 10px 25px rgba(0,0,0,0.1)",
                                            }}
                                            formatter={(value, name) => [
                                                `${value} occurrences`,
                                                "Frequency",
                                            ]}
                                            labelFormatter={(label) =>
                                                `Skill: ${label}`
                                            }
                                        />
                                        <Bar
                                            dataKey="frequency"
                                            fill="url(#skillStatsGradient)"
                                            radius={[0, 4, 4, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                            <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                                <CardTitle className="text-lg">
                                    Skill Percentage Breakdown
                                </CardTitle>
                                <CardDescription className="text-rose-100">
                                    Percentage distribution of top skills
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                {" "}
                                <ResponsiveContainer width="100%" height={320}>
                                    <PieChart>
                                        <Pie
                                            data={data.data?.top_skills.slice(
                                                0,
                                                8
                                            )}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={90}
                                            fill="#8884d8"
                                            dataKey="percentage"
                                            label={({ skill, percentage }) =>
                                                skill.length > 12
                                                    ? `${skill.substring(
                                                          0,
                                                          12
                                                      )}... ${percentage.toFixed(
                                                          1
                                                      )}%`
                                                    : `${skill} ${percentage.toFixed(
                                                          1
                                                      )}%`
                                            }
                                        >
                                            {data.data?.top_skills
                                                .slice(0, 8)
                                                .map(
                                                    (
                                                        entry: any,
                                                        index: number
                                                    ) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                CONSTANTS
                                                                    .COLORS[
                                                                    index %
                                                                        CONSTANTS
                                                                            .COLORS
                                                                            .length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    "rgba(255,255,255,0.95)",
                                                border: "none",
                                                borderRadius: "12px",
                                                boxShadow:
                                                    "0 10px 25px rgba(0,0,0,0.1)",
                                            }}
                                            formatter={(value, name) => [
                                                `${value}%`,
                                                "Percentage",
                                            ]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Skills Table */}
                    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl mt-8">
                        <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                            <CardTitle className="text-lg">
                                Detailed Skill Rankings
                            </CardTitle>
                            <CardDescription className="text-teal-100">
                                Complete breakdown of all skills with
                                frequencies and percentages
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {" "}
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {data.data?.top_skills.map(
                                    (skill: any, index: number) => (
                                        <div
                                            key={skill.rank || skill.skill}
                                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">
                                                        {skill.skill}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        Frequency:{" "}
                                                        {skill.frequency}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-teal-600">
                                                    {skill.percentage
                                                        ? skill.percentage.toFixed(
                                                              1
                                                          )
                                                        : "0"}
                                                    %
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    );
});

export default RecommendSkills;
