import api from "@/app/services/api/api";

const CATEGORIES_URL = '/game';

export function createGameSession(data: any) {
    return api.post(`${CATEGORIES_URL}/game-create`, data).then((response) => response.data);
};