import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

const GlobalJobsChart = React.memo(() => {
    const [selectedCountry, setSelectedCountry] =
        React.useState<string>("United States");

    const { isLoading: isLoadingCountries, data: countriesData } = useQuery({
        queryKey: ["countries", "globalJobs"],
        queryFn: () => analyzeService.getCountries(),
        refetchOnWindowFocus: false,
    });

    const { isLoading, data } = useQuery({
        queryKey: ["globalJobsData", selectedCountry],
        queryFn: () => getJobByCountry({ country: selectedCountry, limit: 10 }),
        refetchOnWindowFocus: false,
        enabled: !!selectedCountry,
    });

    const onCountryChange = (value: string) => {
        setSelectedCountry(value);
    };

    if (isLoadingCountries) {
        return <LoadingChart height={320} />;
    }

    return (
        <>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Country
                </label>
                <Select value={selectedCountry} onValueChange={onCountryChange}>
                    <SelectTrigger className="w-full h-12 rounded-xl border-2 border-green-200 focus:border-green-500 bg-white/80 focus:ring-0 focus:outline-none">
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countriesData.data
                            .filter((country: string) => country !== "Việt Nam")
                            .map((country: string, index: number) => (
                                <SelectItem key={index} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            {isLoading ? (
                <LoadingChart height={320} />
            ) : !data || data.data[0]?.data.length === 0 ? (
                <EmptyState message="No job data available for selected country" />
            ) : (
                <ResponsiveContainer width="100%" height={320}>
                    <RechartsBarChart data={data.data[0]?.data}>
                        <defs>
                            <linearGradient
                                id="globalJobsGradient"
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
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
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
                            fill="url(#globalJobsGradient)"
                            radius={[4, 4, 0, 0]}
                        />
                    </RechartsBarChart>
                </ResponsiveContainer>
            )}
        </>
    );
});

export default GlobalJobsChart;
