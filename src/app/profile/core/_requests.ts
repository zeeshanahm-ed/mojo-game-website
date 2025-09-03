import api from "@/app/services/api/api";

const USER_URL = '/user';
// const UPDATE_PASSWORD = '/users/update-password';

export function updateUserProfile(data: FormData) {
    return api.patch(`${USER_URL}/profile`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => response.data);
}
export function getUserProfile() {
    return api.get(`${USER_URL}/profile`).then((response) => response.data);
}



