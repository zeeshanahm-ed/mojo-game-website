import { useMutation } from 'react-query';
import { updateUserProfile } from '../_requests';

const useUpdateUserProfile = () => {
    const { mutate: mutateUpdateUserProfile, isError, error, isLoading, isSuccess } = useMutation((data: FormData) => updateUserProfile(data));

    return { mutateUpdateUserProfile, isError, error, isLoading, isSuccess };
};

export default useUpdateUserProfile;