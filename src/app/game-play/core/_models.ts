export interface GiveAnswerData {
    gameId: string;
    questionId: string;
    answeredByTeamId: string | null | undefined;
    correctAnswer: boolean;
    points: number;
}