import { useQuery } from "react-query";
import { getAllCategories } from "../_requests";
import { QUERIES_KEYS } from "@/app/utils/constant";


const useGetAllCategories = (lang: string) => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_ALL_CATEGORIES,], () => getAllCategories(lang),
        {
            cacheTime: 1,
            staleTime: 0,
        }
    );

    return { categoriesData: data?.data?.data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetAllCategories;