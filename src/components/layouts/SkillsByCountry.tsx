import React, { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import EmptyState from "./EmptyState";
import { CONSTANTS } from "@/lib/constant";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import analyzeService from "@/services/analyze";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const getSkillsByCountry = async (params: {
    search_country: string;
    limit: number;
}) => {
    const response = await analyzeService.getSkillsByCountry(params);
    return response;
};

const SkillsByCountry = React.memo(() => {
    const [selectedCountry, setSelectedCountry] =
        React.useState<string>("United States");
    const [chartData, setChartData] = React.useState<any[]>([]);
    const countriesData = React.useMemo(() => {
        return {
            data: [
                "United States",
                "Canada",
                "United Kingdom",
                "Australia",
                "India",
                "Germany",
                "France",
                "Japan",
                "Brazil",
                "South Korea",
            ],
        };
    }, []);

    const onCountryChange = (value: string) => {
        setSelectedCountry(value);
    };

    const { isLoading, data } = useQuery({
        queryKey: ["skillsByCountry", selectedCountry],
        queryFn: () =>
            getSkillsByCountry({
                search_country: selectedCountry,
                limit: 20,
            }),
        refetchOnWindowFocus: false,
        enabled: !!selectedCountry,
    });

    useEffect(() => {
        if (data && data.data) {
            const formattedData = data.data.slice(0, 20).map((item, index) => ({
                skill:
                    item.skill.length > 20
                        ? item.skill.substring(0, 20) + "..."
                        : item.skill,
                fullSkill: item.skill,
                count: item.count,
                fill: CONSTANTS.COLORS[index % CONSTANTS.COLORS.length],
            }));
            setChartData(formattedData);
        } else {
            setChartData([]);
        }
    }, [data]);

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Country
                </label>
                <Select value={selectedCountry} onValueChange={onCountryChange}>
                    <SelectTrigger className="w-full h-12 rounded-xl border-2 border-purple-200 focus:border-purple-500 bg-white/80 focus:ring-0 focus:outline-none">
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countriesData.data.map(
                            (country: string, index: number) => (
                                <SelectItem key={index} value={country}>
                                    {country}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <>
                    <Skeleton className="h-64 w-full rounded-xl" />
                </>
            ) : !data || data.data?.length === 0 ? (
                <EmptyState message="No job data available for selected country" />
            ) : (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 60,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e0e4e7"
                            />
                            <XAxis
                                dataKey="skill"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                tickFormatter={(value) => {
                                    if (value >= 1000) {
                                        return `${(value / 1000).toFixed(1)}k`;
                                    }
                                    return value.toString();
                                }}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                                <p className="font-semibold text-gray-800">
                                                    {data.fullSkill}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Count:{" "}
                                                    <span className="font-bold text-purple-600">
                                                        {data.count.toLocaleString()}
                                                    </span>
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="count"
                                radius={[4, 4, 0, 0]}
                                className="hover:opacity-80 transition-opacity duration-200"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
});

export default SkillsByCountry;
