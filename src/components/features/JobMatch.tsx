import React, { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import EmptyState from "../layouts/EmptyState";
import { Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueries } from "@tanstack/react-query";
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

interface JobMatchProps {
    countries: string[];
}

const JobMatch = React.memo(({ countries }: JobMatchProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectCountryJobRCM, setSelectCountryJobRCM] =
        useState<string>("Việt Nam");    const [skills, setSkills] = useState<string[]>([]);
    const [visibleSkillsCount, setVisibleSkillsCount] = useState<{[key: string]: number}>({});
    const [visibleJobsCount, setVisibleJobsCount] = useState(3); 
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedInputValue = useDebounce(inputValue, 500);
    const queries = useQueries({
        queries: [
            {
                queryKey: ["skills", debouncedInputValue],
                queryFn: () => getSkillsReq({ character: debouncedInputValue }),
                enabled: debouncedInputValue.length >= 2, 
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
            let skill = "";
            if (searchSkillsData.length === 0) {
                skill = inputValue.trim();
            }
            else if (searchSkillsData.length > 0) {
                skill = searchSkillsData[0];
            }
            e.preventDefault();
            if (skill && !skills.includes(skill)) {
                setSkills([...skills, skill]);
            }
            setInputValue("");
            setIsDropdownOpen(false);
            inputRef.current?.focus();
        }
    };

    const handleSkillSelect = (skill: string) => {
        const newSkill = skill.trim();
        if (!skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
        }
        setInputValue("");
        setIsDropdownOpen(false);
        inputRef.current?.focus();
    };    const removeTag = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const getVisibleSkillsCount = (jobTitle: string) => {
        return visibleSkillsCount[jobTitle] || 6;
    };    const loadMoreSkills = (jobTitle: string, totalSkills: number) => {
        const currentCount = getVisibleSkillsCount(jobTitle);
        const newCount = Math.min(currentCount + 6, totalSkills);
        setVisibleSkillsCount(prev => ({
            ...prev,
            [jobTitle]: newCount
        }));
    };    const loadMoreJobs = () => {
        setVisibleJobsCount(prev => Math.min(prev + 3, jobRecommendationsData.length));
    };

    // Reset visible jobs count when new data arrives
    useEffect(() => {
        setVisibleJobsCount(3);
    }, [jobRecommendationsData]);

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            {/* Search Section */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Primary Skills
                    </label>
                    <div className="relative" ref={dropdownRef}>
                        <Input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter your primary skill"
                            className="w-full h-12 rounded-xl border-2 border-purple-200 focus:border-purple-500 bg-white/80 z-10"
                            onKeyDown={handleKeyDown}
                        />
                        <div className="px-2 z-20 ">
                            <div className="flex flex-wrap gap-2 mt-2.5">
                                {skills.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center bg-blue-100 text-blue-700  px-4 py-1 rounded-full text-sm text-center font-medium"
                                    >
                                        {tag}
                                        <button
                                            className="ml-2 text-blue-500 hover:text-red-500 cursor-pointer"
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

            {/* Results Section */}
            {isLoading ? (
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-32 w-full rounded-2xl" />
                        </div>
                    ))}
                </div>
            ) : jobRecommendationsData?.length === 0 ? (
                <EmptyState message="No job recommendations available for the selected criteria" />
            ) : (                <div className="grid gap-6">
                    {jobRecommendationsData?.slice(0, visibleJobsCount).map((job, index) => (
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
                            </div>                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        Required Skills:
                                    </p>
                                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        Based on {job.count} job postings
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {job.skills
                                        .slice(0, getVisibleSkillsCount(job.job_title))
                                        .map((skill, index) => {
                                            const frequencyCount = Math.round(skill.weight / job.count);
                                            console.log('frequencyCount: ', frequencyCount);
                                            
                                            return (
                                                <div
                                                    key={skill.skill}
                                                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                                                >
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1"></div>
                                                            {frequencyCount > 1 && (
                                                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                                                                    High Demand
                                                                </span>
                                                            )}
                                                        </div> 
                                                        <div className="flex items-center justify-center">
                                                            <div className="text-center">
                                                                <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                                                                    frequencyCount > 1
                                                                        ? "bg-red-100 text-red-700 border border-red-200"
                                                                        : frequencyCount > 0.5
                                                                        ? "bg-orange-100 text-orange-700 border border-orange-200"
                                                                        : frequencyCount > 0.25
                                                                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                                                                        : "bg-gray-100 text-gray-600 border border-gray-200"
                                                                }`}>
                                                                     {skill.skill}
                                                                </div>
                                                            </div>
                                                        </div>
                                                          {/* Additional Info */}
                                                        <div className="text-xs text-gray-500 text-center">
                                                            {frequencyCount > 1 ? "Critical skill for this role" : 
                                                             frequencyCount > 0.5 ? "Important skill to have" : 
                                                             frequencyCount > 0.25 ? "Useful skill to have" :
                                                             "Nice to have skill"}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                
                                {/* Load More / Show Less Buttons */}
                                {job.skills.length > 6 && (
                                    <div className="flex justify-center mt-6">
                                        {getVisibleSkillsCount(job.job_title) < job.skills.length && (
                                            <button
                                                onClick={() => loadMoreSkills(job.job_title, job.skills.length)}
                                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                <span>Load More Skills</span>
                                                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                                                    +{Math.min(6, job.skills.length - getVisibleSkillsCount(job.job_title))}
                                                </span>
                                            </button>
                                        )}
                                    </div>                                )}
                            </div>
                        </div>
                    ))}
                    
                    {/* Load More Jobs Button */}
                    {visibleJobsCount < jobRecommendationsData.length && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={loadMoreJobs}
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Load More Jobs</span>
                                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                                        +{Math.min(3, jobRecommendationsData.length - visibleJobsCount)}
                                    </span>
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
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

JobMatch.displayName = "JobMatch";

export default JobMatch;
