import { useMutation } from "react-query";
import { createGameSession } from "../_requests";

const useCreateGameSession = () => {
    const { mutate: createGameSessionMutate, isError, error, isLoading, isSuccess } = useMutation((data: any) => createGameSession(data));

    return { createGameSessionMutate, isError, error, isLoading, isSuccess };
};

export default useCreateGameSession;
