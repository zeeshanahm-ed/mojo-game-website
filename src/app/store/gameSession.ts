import { create } from 'zustand';

type Lifelines = {
    scoreSteal: boolean;
    secondChance: boolean;
    callAFriend: boolean;
};

type Team = {
    name: string;
    players: number;
    lifelines: Lifelines;
    score: number;
    teamTurnOn: boolean
};

type teamType = 'team1' | 'team2';

type GameSession = {
    gameName: string;
    mode: string,
    selectedCategories: string[];
    team1: Team;
    team2: Team;
};

type GameSessionStore = {
    session: GameSession | null;
    setSession: (session: GameSession) => void;
    useLifeline: (team: teamType, lifeline: keyof Lifelines) => void;
    addScore: (team: teamType, score: number) => void;
    resetSession: () => void;
    toggleTeamTurn: (team: teamType) => void;
};

// Define initial values for reuse
const initialSession: GameSession = {
    gameName: '',
    mode: '',
    selectedCategories: [],
    team1: {
        name: 'Team 1',
        players: 1,
        score: 0,
        teamTurnOn: true,
        lifelines: {
            scoreSteal: true,
            secondChance: true,
            callAFriend: true,
        },
    },
    team2: {
        name: 'Team 2',
        players: 1,
        score: 0,
        teamTurnOn: false,
        lifelines: {
            scoreSteal: true,
            secondChance: true,
            callAFriend: true,
        },
    },
};

export const useGameSession = create<GameSessionStore>((set) => ({
    session: null,
    setSession: (session) => set({ session }),
    useLifeline: (team, lifeline) =>
        set((state) => {
            if (!state.session) return state;

            const updatedTeam = {
                ...state.session[team],
                lifelines: {
                    ...state.session[team].lifelines,
                    [lifeline]: false,
                },
            };

            return {
                session: {
                    ...state.session,
                    [team]: updatedTeam,
                },
            };
        }),
    addScore: (team: teamType, score: number) =>
        set((state) => {
            if (!state.session) return state;

            const prevScore = state.session[team].score ?? 0;

            return {
                session: {
                    ...state.session,
                    [team]: {
                        ...state.session[team],
                        score: prevScore + score,
                    },
                },
            };
        }),
    resetSession: () => set({ session: initialSession }),
    toggleTeamTurn: (team) =>
        set((state) => {
            if (!state.session) return state;

            const otherTeam = team === 'team1' ? 'team2' : 'team1';

            return {
                session: {
                    ...state.session,
                    [team]: {
                        ...state.session[team],
                        teamTurnOn: true,
                    },
                    [otherTeam]: {
                        ...state.session[otherTeam],
                        teamTurnOn: false,
                    },
                },
            };
        }),
}));
