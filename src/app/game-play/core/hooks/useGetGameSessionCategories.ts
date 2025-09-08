import { useQuery } from "react-query";
import { getGameSessionCategories } from "../_requests";
import { QUERIES_KEYS } from "@/app/utils/constant";


const useGetGameSessionCategories = (gameId: string) => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_ALL_GAME_SESSION_CATEGORIES, gameId], () => getGameSessionCategories(gameId),
        {
            cacheTime: 1,
            staleTime: 0,
        }
    );

    return { categoriesData: data?.data?.data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetGameSessionCategories;