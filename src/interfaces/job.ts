type JobData = {
    job_title: string;
    count: number;
};

interface JobTrendData {
    year: string;
    jobs: {
        job_title: string;
        count: number;
    }[];
}

interface MonthlyJobData {
    month: string;
    count: number;
}

interface SkillData {
    search_country: string;
    skill: string;
    count: number;
}

export type { JobData, JobTrendData, MonthlyJobData, SkillData };