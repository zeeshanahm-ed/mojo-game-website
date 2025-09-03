import api from "@/app/services/api/api";

const CATEGORIES_URL = '/category';

export function getAllCategories(lang: string) {
    return api.get(`${CATEGORIES_URL}/list`, { params: { lang } }).then((response) => response.data);
}



