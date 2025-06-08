import { CONSTANTS } from "@/lib/constant";
import analyzeService from "@/services/analyze";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import EmptyState from "./EmptyState";
import LoadingChart from "./LoadingChart";

const getGlobalSkillsRequest = async (params: { limit: number }) => {
    const response = await analyzeService.getGlobalSkills(params);
    return response;
};

const GlobalSkillsChart = React.memo(() => {
    const { isLoading, data } = useQuery({
        queryKey: ["globalSkills"],
        queryFn: () => getGlobalSkillsRequest({ limit: CONSTANTS.LIMIT_DATA }),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <LoadingChart height={280} />;
    }

    if (!data || data.data?.length === 0) {
        return <EmptyState message="No global skills data available" />;
    }

    const chartData = data.data.map((item) => ({
        skill: item.skill,
        count: Number(item.count),
    }));

    return (
        <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData.sort((a, b) => b.count - a.count)}
                    className="-ml-5"
                >
                    <defs>
                        <linearGradient
                            id="skillGlobalGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#3A83F5"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="100%"
                                stopColor="#0FAEDA"
                                stopOpacity={0.4}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="skill"
                        tick={{ fontSize: 11, textAnchor: "end" }}
                        angle={-45}
                        height={80}
                        interval={0}
                        stroke="#6b7280"
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                            if (value >= 1000) {
                                return `${(value / 1000).toFixed(1)}k`;
                            }
                            return value.toString();
                        }}
                        stroke="#6b7280"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(255,255,255,0.98)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value: any) => [
                            value.toLocaleString(),
                            "Jobs",
                        ]}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#skillGlobalGradient)"
                        radius={[6, 6, 0, 0]}
                        strokeWidth={0}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

export default GlobalSkillsChart;
