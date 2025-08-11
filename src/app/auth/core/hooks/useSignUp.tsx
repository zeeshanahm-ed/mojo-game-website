import { useMutation } from 'react-query';

import { signUp } from '../_requests';

const useSignUp = () => {
    const { mutate: signUpMutate, isError, error, isLoading, isSuccess } = useMutation((body: FormData) => signUp(body));

    return { signUpMutate, isError, error, isLoading, isSuccess };
};

export default useSignUp;
