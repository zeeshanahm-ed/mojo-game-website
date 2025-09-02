import { currencyOptionsInterface, GamesCategoryInterface } from "../utils/Interfaces";

export const categories: GamesCategoryInterface[] = [
    { id: "1", name: 'Horror Movies', icon: '/images/categories-images/horror-movies.png' },
    { id: "2", name: 'Cinema', icon: '/images/categories-images/cinema.png' },
    { id: "3", name: 'Wrestling', icon: '/images/categories-images/wrestling.png' },
    { id: "4", name: 'Currency', icon: '/images/categories-images/currency.png' },
    { id: "5", name: 'Qatar', icon: '/images/categories-images/qatar.png' },
    { id: "6", name: 'Cars', icon: '/images/categories-images/cars.png' },
    { id: "7", name: 'Moto Bikes', icon: '/images/categories-images/motor-bike.png' },
    { id: "8", name: 'Football', icon: '/images/categories-images/football.png' },
    { id: "9", name: 'Fast Food', icon: '/images/categories-images/fast-food.png' },
    { id: "10", name: 'Saudi Arabia', icon: '/categories-images/saudi-arabia.png' },
    { id: "11", name: 'Basket Ball', icon: '/images/categories-images/basket-ball.png' },
    { id: "12", name: 'General Info', icon: '/images/categories-images/general-info.png' },
    { id: "13", name: 'Music', icon: '/images/categories-images/music.png' },
    { id: "14", name: 'E Gaming', icon: '/images/categories-images/e-gaming.png' },
    { id: "15", name: 'Pro Boxing', icon: '/images/categories-images/pro-boxing.png' },
    { id: "16", name: 'Animal Planet', icon: '/images/categories-images/animal-planet.png' }
];

export const Currency_Options: currencyOptionsInterface[] = [
    { label: 'Kuwaiti Dinar', value: 'KWD', icon: '/images/kuwait.png' },
    { label: 'Saudi Riyal', value: 'SAR', icon: '/images/saudia.png' },
    { label: 'Qatari Riyal', value: 'QAR', icon: '/images/qatar.png' },
    { label: 'Omani Rial', value: 'OMR', icon: '/images/oman.png' },
    // { label: 'Bahraini Dinar', value: 'BHD', flag: '🇧🇭' },
    // { label: 'UAE Dirham', value: 'AED', flag: '🇦🇪' }
];


export interface offlineQuestionsListInterface {
    id: string;
    category: string;
    text: string;
    points: number;
    mediaType: string,
    difficulty: string,
    mediaUrl?: string;
    answer?: string;
    used?: boolean;
}

export const offlineQuestionsList: offlineQuestionsListInterface[] = [
    // ========== Wrestling ==========
    {
        id: "wrestling-200",
        category: "Wrestling",
        text: "Identify this legendary WWE wrestler.",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "The Undertaker"
    },
    {
        id: "wrestling-400",
        category: "Wrestling",
        text: "Listen to this theme music and name the wrestler.",
        points: 400,
        mediaType: "audio",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "medium",
        answer: "Triple H"
    },
    {
        id: "wrestling-600",
        category: "Wrestling",
        text: "Watch the clip and name the event.",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "WrestleMania"
    },
    {
        id: "wrestling-201",
        category: "Wrestling",
        text: "Name the wrestler known as 'The Rock'.",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "Dwayne Johnson"
    },
    {
        id: "wrestling-401",
        category: "Wrestling",
        text: "Name the move shown in this image.",
        points: 400,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "medium",
        answer: "RKO"
    },
    {
        id: "wrestling-601",
        category: "Wrestling",
        text: "Who delivered this promo?",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "CM Punk"
    },

    // ========== Cinema ==========
    {
        id: "cinema-200",
        category: "Cinema",
        text: "Guess the movie from this scene.",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "Titanic"
    },
    {
        id: "cinema-400",
        category: "Cinema",
        text: "Which movie won this Oscar award shown?",
        points: 400,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "medium",
        answer: "Parasite"
    },
    {
        id: "cinema-600",
        category: "Cinema",
        text: "Watch the clip and identify the actor.",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "Joaquin Phoenix"
    },
    {
        id: "cinema-201",
        category: "Cinema",
        text: "Who directed the movie 'Interstellar'?",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "Christopher Nolan"
    },
    {
        id: "cinema-401",
        category: "Cinema",
        text: "Listen to this soundtrack and name the film.",
        points: 400,
        mediaType: "audio",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        difficulty: "medium",
        answer: "Inception"
    },
    {
        id: "cinema-601",
        category: "Cinema",
        text: "Identify the movie by this monologue.",
        points: 600,
        mediaType: "audio",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        difficulty: "hard",
        answer: "The Pursuit of Happyness"
    },

    // ========== Fast Food ==========
    {
        id: "fastfood-200",
        category: "Fast Food",
        text: "Identify the brand from this logo.",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "McDonald's"
    },
    {
        id: "fastfood-400",
        category: "Fast Food",
        text: "Name this item from the sound of its preparation.",
        points: 400,
        mediaType: "audio",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        difficulty: "medium",
        answer: "French Fries"
    },
    {
        id: "fastfood-600",
        category: "Fast Food",
        text: "Watch the clip and name the fast-food chain.",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "KFC"
    },
    {
        id: "fastfood-201",
        category: "Fast Food",
        text: "What is the slogan of Subway?",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "Eat Fresh"
    },
    {
        id: "fastfood-401",
        category: "Fast Food",
        text: "Guess the burger from the image.",
        points: 400,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "medium",
        answer: "Big Mac"
    },
    {
        id: "fastfood-601",
        category: "Fast Food",
        text: "Identify the commercial jingle.",
        points: 600,
        mediaType: "audio",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        difficulty: "hard",
        answer: "Burger King"
    },

    // ========== E Gaming ==========
    {
        id: "egaming-200",
        category: "E Gaming",
        text: "Guess the game from the sound.",
        points: 200,
        mediaType: "audio",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        difficulty: "easy",
        answer: "CS:GO"
    },
    {
        id: "egaming-400",
        category: "E Gaming",
        text: "Identify the character from this image.",
        points: 400,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "medium",
        answer: "Mario"
    },
    {
        id: "egaming-600",
        category: "E Gaming",
        text: "Watch and name the game in this clip.",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "Apex Legends"
    },
    {
        id: "egaming-201",
        category: "E Gaming",
        text: "Name the most played battle royale game in 2022.",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "PUBG"
    },
    {
        id: "egaming-401",
        category: "E Gaming",
        text: "Identify this game map.",
        points: 400,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "medium",
        answer: "Dust II"
    },
    {
        id: "egaming-601",
        category: "E Gaming",
        text: "What game engine does Fortnite use?",
        points: 600,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "hard",
        answer: "Unreal Engine"
    },

    // ========== Boxing ==========
    {
        id: "boxing-200",
        category: "Boxing",
        text: "Who is this legendary boxer?",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "Muhammad Ali"
    },
    {
        id: "boxing-400",
        category: "Boxing",
        text: "Listen to the commentary and identify the match.",
        points: 400,
        mediaType: "audio",
        mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        difficulty: "medium",
        answer: "Ali vs Frazier"
    },
    {
        id: "boxing-600",
        category: "Boxing",
        text: "Watch the punch sequence and guess the boxer.",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "Mike Tyson"
    },
    {
        id: "boxing-201",
        category: "Boxing",
        text: "What is the weight class between lightweight and welterweight?",
        points: 200,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "easy",
        answer: "Light welterweight"
    },
    {
        id: "boxing-401",
        category: "Boxing",
        text: "Guess the boxer from this statue image.",
        points: 400,
        mediaType: "image",
        mediaUrl: "/media/image-based-question.jpg",
        difficulty: "medium",
        answer: "Rocky Balboa"
    },
    {
        id: "boxing-601",
        category: "Boxing",
        text: "Name the boxer from this documentary clip.",
        points: 600,
        mediaType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        difficulty: "hard",
        answer: "Floyd Mayweather Jr."
    }
];


