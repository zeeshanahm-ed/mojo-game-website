export interface GamesCategoryInterface {
    name: string;
    icon: string;
    id: string;
    selected?: boolean;
}
export interface SelectedGamesPaymentDetailsInterface {
    id: string;
    title: string;
    image: string;
    questions: number;
    price: number;
    position?: string;
    isSelected?: boolean;
}