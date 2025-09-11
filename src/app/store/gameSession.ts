import { create } from 'zustand';

type Lifeline = {
    lifeLineId: string;
    lifeLineName: string;
    teamId: string;
    used: boolean;
};

type Lifelines = Lifeline[] | {
    scoreSteal?: boolean;
    secondChance?: boolean;
    callAFriend?: boolean;
};

type Team = {
    name: string;
    players: number;
    lifelines?: Lifeline[];
    score: number;
    teamId: string;
    teamTurnOn: boolean
};

type teamType = 'team1' | 'team2';

type GameSession = {
    gameData: any;
    gameName: string;
    mode: string,
    team1: Team;
    team2: Team;
};

type GameSessionStore = {
    session: GameSession | null;
    setSession: (session: GameSession) => void;
    useLifeline: (team: teamType, lifeline: Lifeline) => void;
    addScore: (team: teamType, score: number) => void;
    resetSession: () => void;
    toggleTeamTurn: (team: teamType) => void;
};

// Define initial values for reuse
const initialSession: GameSession = {
    gameData: null,
    gameName: '',
    mode: '',
    team1: {
        name: 'Team 1',
        players: 1,
        score: 0,
        teamId: '',
        teamTurnOn: false,
        lifelines: [],
    },
    team2: {
        name: 'Team 2',
        players: 1,
        score: 0,
        teamId: '',
        teamTurnOn: false,
        lifelines: [],
    },
};

export const useGameSession = create<GameSessionStore>((set) => ({
    session: null,
    setSession: (session) => set({ session }),
    useLifeline: (team, lifeline) =>
        set((state) => {
            if (!state.session) return state;

            // lifelines is now an array of lifeline objects, not an object
            const updatedLifelines = Array.isArray(state.session[team].lifelines)
                ? state.session[team].lifelines.map((l: Lifeline) =>
                    l.lifeLineId === lifeline.lifeLineId
                        ? { ...l, used: true }
                        : l
                )
                : state.session[team].lifelines;

            return {
                session: {
                    ...state.session,
                    [team]: {
                        ...state.session[team],
                        lifelines: updatedLifelines,
                    },
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
