import axiosClient from "@/apis/client";

const getCountries = async () => {
    const response = await axiosClient.get("/analyze/countries");
    return response;
}

const getJobByCountry = async (params: {country: string, limit: number}) => {
    const response = await axiosClient.get(`/analyze/get-job-by-country?search_country=${params.country}&limit=${params.limit}`);
    return response;
}

const getSkillsByJobAndCountry = async (params: {country: string, job_title: string, limit: number}) => {
    const response = await axiosClient.get(`/analyze/job-skills-by-title-and-country?country=${params.country}&limit=${params.limit}&job_title=${params.job_title}`);
    return response;
}
const getJobBySkillsAndCountry = async (params: {skills: string[], country: string, limit: number}) => {
    const response = await axiosClient.get(`/analyze/job-by-skills-and-country?input_skills=${params.skills.join(",")}&search_country=${params.country}&limit=${params.limit}`);
    return response;
}

const getSkills = async (params: {character: string}) => {
    const response = await axiosClient.get(`/analyze/skills?character=${params.character}`);
    return response;
}

const getJobRecommendations = async (params: {skills: string[], country: string, limit: number}) => {
    const response = await axiosClient.get(`/analyze/job-recommendations?input_skills=${params.skills.join(",")}&search_country=${params.country}&limit=${params.limit}`);
    return response;
}

const getJobsTrend = async (params: {limit: number, value: number}) => {
    const response = await axiosClient.get(`/analyze/jobs-trend?limit=${params.limit}&value=${params.value}`);
    return response;
}

const getSkillsByCountry = async (params: {search_country: string, limit: number}) => {
    const response = await axiosClient.get(`/analyze/skill-by-country?search_country=${params.search_country}&limit=${params.limit}`);
    return response;
}

const getGlobalSkills = async (params: {limit: number}) => {
    const response = await axiosClient.get(`/analyze/global-skills?limit=${params.limit}`);
    return response;
}

const analyzeService = {
    getCountries,
    getJobByCountry,
    getJobBySkillsAndCountry,
    getSkillsByJobAndCountry,
    getSkills,
    getJobRecommendations,
    getJobsTrend,
    getSkillsByCountry,
    getGlobalSkills
}

export default analyzeService;