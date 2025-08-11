import api from "@/app/services/api/api";

const USER_URL = '/user/profile';
const UPDATE_PASSWORD = '/users/update-password';

export function updateUserProfile(data: FormData) {
    return api.patch(`${USER_URL}`, data).then((response) => response);
}



