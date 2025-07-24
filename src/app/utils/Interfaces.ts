export interface Category {
    name: string;
    icon: string;
    color: string;
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