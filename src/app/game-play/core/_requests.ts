import api from "@/app/services/api/api";

const CATEGORIES_URL = '/category';

export function getAllCategories(params: { [key: string]: string }) {
    return api.get(`${CATEGORIES_URL}/list`, { params }).then((response) => response.data);
}



