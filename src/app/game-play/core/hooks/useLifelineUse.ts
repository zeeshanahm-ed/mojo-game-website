import { useMutation } from "react-query";
import { lifelineUse } from "../_requests";

const useLifelineUse = () => {
    const { mutate: mutateLifelineUse, isError, error, isLoading, isSuccess } = useMutation((body: any) => lifelineUse(body));

    return { mutateLifelineUse, isError, error, isLoading, isSuccess };
};

export default useLifelineUse;