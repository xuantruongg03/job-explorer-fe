import analyzeService from "@/services/analyze";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
    Bar,
    CartesianGrid,
    BarChart as RechartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import EmptyState from "./EmptyState";
import LoadingChart from "./LoadingChart";

const getJobByCountry = async (params: { country: string; limit: number }) => {
    const response = await analyzeService.getJobByCountry({
        country: params.country,
        limit: params.limit,
    });
    return response;
};

const VietnamJobsChart = React.memo(() => {
    const { isLoading, data } = useQuery({
        queryKey: ["vietnamJobsData"],
        queryFn: () => getJobByCountry({ country: "Việt Nam", limit: 10 }),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <LoadingChart height={320} />;
    }

    if (!data || data.data[0]?.data.length === 0) {
        return <EmptyState message="No job data available" />;
    }

    return (
        <>
            <div className="mb-6">
                <div className="h-24"></div>
                <ResponsiveContainer width="100%" height={320}>
                    <RechartsBarChart data={data?.data[0]?.data}>
                        <defs>
                            <linearGradient
                                id="jobsGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#6366f1"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#8b5cf6"
                                    stopOpacity={0.3}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis
                            dataKey="job_title"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                                if (value >= 1000) {
                                    return `${(value / 1000).toFixed(1)}k`;
                                }
                                return value.toString();
                            }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                border: "none",
                                borderRadius: "12px",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill="url(#jobsGradient)"
                            radius={[4, 4, 0, 0]}
                        />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
});

export default VietnamJobsChart;
