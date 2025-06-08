import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import analyzeService from '@/services/analyze';

const getJobByCountry = async (params: { country: string, limit: number }) => {
    const response = await analyzeService.getJobByCountry({ country: params.country, limit: params.limit });
    return response;
}

export const useJobData = (selectedGlobalCountry: string) => {
    const queries = useQueries({
        queries: [
            {
                queryKey: ['vietnamJobs'],
                queryFn: () => getJobByCountry({ country: "Việt Nam", limit: 10 }),
                refetchOnWindowFocus: false,
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
            {
                queryKey: ['globalJobs', selectedGlobalCountry],
                queryFn: () => getJobByCountry({ country: selectedGlobalCountry, limit: 10 }),
                refetchOnWindowFocus: false,
                enabled: !!selectedGlobalCountry,
                staleTime: 5 * 60 * 1000,
            },
            {
                queryKey: ['countries'],
                queryFn: () => analyzeService.getCountries(),
                refetchOnWindowFocus: false,
                staleTime: 30 * 60 * 1000, // 30 minutes - countries change rarely
            }
        ]
    });

    return useMemo(() => {
        const [vietnamQuery, globalQuery, countriesQuery] = queries;
        
        return {
            vietnamJobs: {
                data: vietnamQuery?.data?.data?.[0]?.data || [],
                isLoading: vietnamQuery?.isLoading || false,
                isError: vietnamQuery?.isError || false,
            },
            globalJobs: {
                data: globalQuery?.data?.data?.[0]?.data || [],
                isLoading: globalQuery?.isLoading || false,
                isError: globalQuery?.isError || false,
            },
            countries: {
                data: countriesQuery?.data?.data || [],
                isLoading: countriesQuery?.isLoading || false,
                isError: countriesQuery?.isError || false,
            }
        };
    }, [queries]);
};