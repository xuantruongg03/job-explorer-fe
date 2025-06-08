import React, { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import EmptyState from "./EmptyState";
import { Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueries, useQuery } from "@tanstack/react-query";
import analyzeService from "@/services/analyze";

const getSkillsReq = async (params: { character: string }) => {
    const response = await analyzeService.getSkills(params);
    return response;
};

const jobRecommendationsReq = async (params: {
    skills: string[];
    country: string;
}) => {
    const response = await analyzeService.getJobRecommendations({
        skills: params.skills,
        country: params.country,
        limit: 10,
    });
    return response;
};

const JobMatch = React.memo(({ countries }: { countries: string[] }) => {
    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
    const [selectCountryJobRCM, setSelectCountryJobRCM] =
        useState<string>("Việt Nam");
    const [skills, setSkills] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounce input value với delay 500ms
    const debouncedInputValue = useDebounce(inputValue, 500);
    const queries = useQueries({
        queries: [
            {
                queryKey: ["skills", debouncedInputValue],
                queryFn: () => getSkillsReq({ character: debouncedInputValue }),
                enabled: debouncedInputValue.length >= 2, // Chỉ gọi API khi có ít nhất 2 ký tự
                refetchOnWindowFocus: false,
            },
            {
                queryKey: ["jobRecommendations", selectCountryJobRCM, skills],
                queryFn: () =>
                    jobRecommendationsReq({
                        country: selectCountryJobRCM,
                        skills,
                    }),
                refetchOnWindowFocus: false,
                enabled: skills.length > 0 && !!selectCountryJobRCM,
            },
        ],
    });
    const [search, jobRecommendations] = queries;
    const jobRecommendationsData = jobRecommendations.data?.data || [];
    const isLoadingSearching = search.isLoading;
    const isLoading = jobRecommendations.isLoading;
    const isError = search.isError || jobRecommendations.isError;
    const searchSkillsData = search.data?.data || [];

    // useEffect(() => {
    //     if (searchSkillsData) {
    //         setFilteredSkills(searchSkillsData?.data.slices(0, 10)); // Giới hạn kết quả trả về tối đa 10 kỹ năng
    //         setIsDropdownOpen(true);
    //     } else {
    //         setFilteredSkills([]);
    //     }
    // }, [searchSkillsData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() === "") {
            setIsDropdownOpen(false);
        } else {
            setIsDropdownOpen(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            const skill = searchSkillsData[0]
            console.log('skill: ', skill);
            e.preventDefault();
            if (!skills.includes(skill)) {
                setSkills([...skills, skill.trim()]);
            }
            setInputValue("");
            setIsDropdownOpen(false);
        }
    };

    const handleSkillSelect = (skill: string) => {
        console.log('skill: ', skill);
        const newSkill = skill.trim();
        if (!skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
        }
        setInputValue("");
        setIsDropdownOpen(false);
        inputRef.current?.focus();
    };

    const removeTag = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Primary Skill
                    </label>
                    <div className="relative">
                        <Input
                            list="skills"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Enter your primary skill"
                            className="w-full h-12 rounded-xl border-2 border-purple-200 focus:border-purple-500 bg-white/80 z-10"
                            onKeyDown={handleKeyDown}
                        />
                        <div className=" inset-0 px-2 z-20">
                            <div className="flex flex-wrap gap-2 mt-2.5 ">
                                {skills.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                        <button
                                            className="ml-1 text-blue-500 hover:text-red-500 cursor-pointer"
                                            onClick={() => removeTag(index)}
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-purple-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                {isLoadingSearching ? (
                                    <div className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                                            <span className="text-gray-500">
                                                Searching skills...
                                            </span>
                                        </div>
                                    </div>
                                ) : searchSkillsData.length > 0 ? (
                                    searchSkillsData.map((skill, index) => (
                                        <div
                                            key={skill}
                                            onClick={() =>
                                                handleSkillSelect(skill)
                                            }
                                            className="px-4 py-3 hover:bg-purple-50 cursor-pointer transition-colors duration-150 border-b border-purple-100 last:border-b-0 flex items-center justify-between"
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {skill}
                                            </span>
                                            {skills.includes(skill) && (
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            )}
                                        </div>
                                    ))
                                ) : debouncedInputValue ? (
                                    <div className="px-4 py-3 text-gray-500 text-center">
                                        No skills found. Press Enter to add "
                                        {debouncedInputValue}"
                                    </div>
                                ) : null}
                            </div>
                        )}
                        {/* <datalist id="skills">
                                {skills.map((skill) => (
                                    <option key={skill} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </datalist> */}
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Country
                    </label>
                    <Select
                        value={selectCountryJobRCM}
                        onValueChange={setSelectCountryJobRCM}
                    >
                        <SelectTrigger className="w-full h-12 rounded-xl border-2 border-purple-200 focus:border-purple-500 bg-white/80">
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
                <div className="space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-32 w-full rounded-2xl" />
                        </div>
                    ))}
                </div>
            ) : jobRecommendationsData.length === 0 ? (
                <EmptyState message="No job recommendations available for the selected criteria" />
            ) : (
                <div className="grid gap-6">
                    {jobRecommendationsData.map((job, index) => (
                        <div
                            key={job.job_title}
                            className="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                                        <Briefcase className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {job.job_title}
                                        </h3>
                                        <p className="text-gray-600">
                                            Perfect match for your profile
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-bold px-4 py-2 rounded-full"
                                >
                                    {job.count} positions
                                </Badge>
                            </div>
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-gray-700 mb-3">
                                    Required Skills & Match Percentage:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {job.skills.map((skill) => (
                                        <div
                                            key={skill.skill}
                                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge
                                                    variant={
                                                        skill.weight > 0.7
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className={
                                                        skill.weight > 0.7
                                                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                                            : ""
                                                    }
                                                >
                                                    {skill.skill}
                                                </Badge>
                                                <span className="text-sm font-bold text-gray-700">
                                                    {(
                                                        skill.weight * 100
                                                    ).toFixed(0)}
                                                    %
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${
                                                            skill.weight * 100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
});

export default JobMatch;
