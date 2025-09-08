import { getLanguage } from "@/app/helpers/helpers-functions";
import api from "@/app/services/api/api";

const CATEGORIES_URL = '/category';
const GAME_URL = '/game';

export function getAllCategories(params: { [key: string]: string }) {
    return api.get(`${CATEGORIES_URL}/list`, { params }).then((response) => response.data);
};

export function getGameSessionCategories(gameId: string) {
    return api.get(`${GAME_URL}/${gameId}/categories`, { params: { lang: getLanguage() } }).then((response) => response.data);
};



