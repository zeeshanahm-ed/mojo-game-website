import { getLanguage } from "@/app/helpers/helpers-functions";
import api from "@/app/services/api/api";
import { GiveAnswerData } from "./_models";

const CATEGORIES_URL = '/category';
const GAME_URL = '/game';
const QUESTION_URL = '/question';

export function getAllCategories(params: { [key: string]: string }) {
    return api.get(`${CATEGORIES_URL}/list`, { params }).then((response) => response.data);
};

export function getGameSessionCategories(gameId: string) {
    return api.get(`${GAME_URL}/${gameId}/categories`, { params: { lang: getLanguage() } }).then((response) => response.data);
};
export function gameStatus(gameId: string) {
    return api.get(`${GAME_URL}/state/${gameId}`).then((response) => response.data);
};
export function getTurnIndex(gameId: string) {
    return api.get(`${GAME_URL}/${gameId}/turn-info`).then((response) => response.data);
};
export function getCurrentQuestion(questionId: string) {
    return api.get(`${QUESTION_URL}/${questionId}`, { params: { lang: getLanguage() } }).then((response) => response.data);
};
export function giveAnswer(data: GiveAnswerData) {
    return api.post(`${GAME_URL}/answer`, data).then((response) => response.data);
};
export function gameEnd(gameId: string) {
    return api.post(`${GAME_URL}/end`, { gameId }).then((response) => response.data);
};




