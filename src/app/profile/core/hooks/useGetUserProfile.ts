import { useQuery } from "react-query";
import { getUserProfile } from "../_requests";
import { QUERIES_KEYS } from "@/app/utils/constant";


const useGetUserProfile = () => {
    const { data, error, isLoading, isError, isSuccess, refetch } = useQuery([QUERIES_KEYS.GET_USER_PROFILE,], () => getUserProfile(),
        {
            cacheTime: 1,
            staleTime: 0,
        }
    );

    return { userData: data?.data?.data, error, isLoading, isError, isSuccess, refetch };
};

export default useGetUserProfile;