import { useMutation } from 'react-query';

import { ISignInForm } from '../_models';
import { signIn } from '../_requests';

const useSignIn = () => {

    const { mutate: signInMutate, isError, error, isLoading, isSuccess } = useMutation((body: ISignInForm) => signIn(body));

    return { signInMutate, isError, error, isLoading, isSuccess };
};

export default useSignIn;
