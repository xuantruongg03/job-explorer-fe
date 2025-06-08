import { EmptyState, LoadingChart } from "@/components/layouts";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CONSTANTS } from "@/lib/constant";
import { Calendar, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import analyzeService from "@/services/analyze";
import { JobTrendData, MonthlyJobData } from "@/interfaces/job";
import YearPicker from "../ui/year-picker";

const getJobTrendRequest = async (value: number) => {
    const response = await analyzeService.getJobsTrend({
        limit: 10,
        value: value,
    });
    return response;
};

const JobsTrend = React.memo(() => {
    const [type, setType] = useState<string>("thisYear");
    const [value, setValue] = useState<number>(2023);
    const [jobsByMonth, setJobsByMonth] = useState<JobTrendData[]>([]);
    const [selectedJob, setSelectedJob] = useState<string>("");
    const [monthlyData, setMonthlyData] = useState<MonthlyJobData[]>([]);
    const [sliceCount, setSliceCount] = useState<number>(12);

    const handleLoadMore = () => {
        setSliceCount((prevCount) => prevCount + 12);
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
    };

    const handleValueChange = (newValue: number) => {
        setType("custom");
        setValue(newValue);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["jobsTrend", type, value],
        queryFn: async () => getJobTrendRequest(value),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data?.data) {
            const jobsMap = new Map<string, number>();

            data.data.forEach(
                (month: {
                    month_year: string;
                    jobs: { job_title: string; count: number }[];
                }) => {
                    month.jobs.forEach((job) => {
                        const currentCount = jobsMap.get(job.job_title) || 0;
                        jobsMap.set(job.job_title, currentCount + job.count);
                    });
                }
            );

            const aggregatedJobs = Array.from(jobsMap.entries())
                .map(([job_title, count]) => ({ job_title, count }))
                .sort((a, b) => b.count - a.count);

            const formattedData = [
                {
                    year: value.toString(),
                    jobs: aggregatedJobs,
                },
            ];

            setJobsByMonth(formattedData);
            if (aggregatedJobs.length > 0 && !selectedJob) {
                setSelectedJob(aggregatedJobs[0].job_title);
            }
        }
    }, [data, value]);

    useEffect(() => {
        if (data?.data && selectedJob) {
            const monthlyJobData: MonthlyJobData[] = [];

            data.data.forEach(
                (month: {
                    month_year: string;
                    jobs: { job_title: string; count: number }[];
                }) => {
                    const jobInMonth = month.jobs.find(
                        (job) => job.job_title === selectedJob
                    );
                    monthlyJobData.push({
                        month: month.month_year,
                        count: jobInMonth ? jobInMonth.count : 0,
                    });
                }
            );

            // Sort by month
            monthlyJobData.sort((a, b) => a.month.localeCompare(b.month));
            setMonthlyData(monthlyJobData);
        }
    }, [data, selectedJob]);

    const handleJobClick = (jobTitle: string) => {
        setSelectedJob(jobTitle);
    };

    return (
        <>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#71de99] to-teal-500 text-white pb-8">
                    <CardTitle className="flex justify-between">
                        <div className="flex items-center space-x-3 text-xl">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <span>Job Market Trends</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span
                                className={`text-sm text-white/80 p-2 rounded-lg hover:bg-white/30 transition-colors cursor-pointer ${
                                    type === "thisYear" ? "bg-white/20" : ""
                                }`}
                                onClick={() => handleTypeChange("thisYear")}
                            >
                                This Year Analysis
                            </span>
                            <YearPicker
                                selectedYear={value}
                                onYearChange={handleValueChange}
                                startYear={CONSTANTS.START_YEAR}
                                endYear={new Date().getFullYear() - 1}
                                className=""
                                classNameChildren={`text-white/80 text-sm p-2 rounded-lg hover:bg-white/30 transition-colors cursor-pointer ${
                                    type === "custom"
                                        ? "bg-white/20 w-full h-full"
                                        : ""
                                }`}
                                color={CONSTANTS.COLORS[5]}
                            />
                        </div>
                    </CardTitle>
                    <CardDescription className="text-green-100">
                        {selectedJob
                            ? `Monthly trend for: ${selectedJob}`
                            : "Click on a job below to see monthly trends"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    {isLoading ? (
                        <LoadingChart height={420} />
                    ) : data?.data.length === 0 ? (
                        <EmptyState message="No trend data available" />
                    ) : (
                        <ResponsiveContainer width="100%" height={420}>
                            <LineChart data={monthlyData}>
                                <defs>
                                    <linearGradient
                                        id="lineGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#10b981"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#06b6d4"
                                            stopOpacity={0.3}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e0e7ff"
                                />
                                <XAxis
                                    dataKey="month"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        if (value >= 1000) {
                                            return `${(value / 1000).toFixed(
                                                1
                                            )}k`;
                                        }
                                        return value.toString();
                                    }}
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
                                        `${value} jobs`,
                                        selectedJob,
                                    ]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{
                                        fill: "#10b981",
                                        strokeWidth: 2,
                                        r: 6,
                                    }}
                                    activeDot={{
                                        r: 8,
                                        stroke: "#10b981",
                                        strokeWidth: 2,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                    ))}
                </div>
            ) : jobsByMonth.length === 0 ? (
                <EmptyState message="No job data available" />
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white pb-4">
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>Jobs Summary for {value}</span>
                            </CardTitle>
                            <CardDescription className="text-blue-100">
                                Click on any job to see its monthly trend above
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {jobsByMonth[0]?.jobs
                                    .slice(0, sliceCount)
                                    .map((job, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                handleJobClick(job.job_title)
                                            }
                                            className={`flex justify-between items-center rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
                                                selectedJob === job.job_title
                                                    ? "bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-400"
                                                    : "bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50"
                                            }`}
                                        >
                                            <span className="text-sm font-medium text-gray-700 truncate pr-2">
                                                {job.job_title}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className={`font-bold ${
                                                    selectedJob ===
                                                    job.job_title
                                                        ? "bg-green-200 text-green-800 border-green-400"
                                                        : index < 3
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : "bg-blue-50 text-blue-700 border-blue-200"
                                                }`}
                                            >
                                                {job.count.toLocaleString()}
                                            </Badge>
                                        </div>
                                    ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                {/* Nút Load More chỉ hiển thị nếu có nhiều hơn sliceCount jobs */}
                                {jobsByMonth[0]?.jobs.length > sliceCount && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <span>Load More Jobs</span>
                                            <svg
                                                className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                                />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                )}
                            </div>

                            {/* Hiển thị tổng số jobs */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                                    <span className="text-lg font-semibold text-gray-800">
                                        Total Job Postings
                                    </span>
                                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg px-4 py-2">
                                        {jobsByMonth[0]?.jobs
                                            .reduce(
                                                (sum, job) => sum + job.count,
                                                0
                                            )
                                            .toLocaleString()}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
});

export default JobsTrend;
