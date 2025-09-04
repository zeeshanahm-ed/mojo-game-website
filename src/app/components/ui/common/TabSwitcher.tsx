import { useDirection } from "@/app/hooks/useGetDirection";
import { useTranslation } from "react-i18next";

type Tab = {
    label: string;
    count?: number;
};

type TabSwitcherProps = {
    selectedTab: number;
    onSelectTab: (index: number) => void;
    tabs: Tab[];
};

function TabSwitcher({ selectedTab, onSelectTab, tabs, }: TabSwitcherProps) {
    const { t } = useTranslation();
    const direction = useDirection();

    return (
        <div className={`flex justify-between ${direction === "rtl" ? "font-arabic" : "font-secondary"} relative text-center border-b border-border-gray`}>
            {tabs.map((tab, index) => (
                <div key={index} className='flex-1 relative'>
                    <button
                        className={`h-11 gap-3 px-3 transition font-medium text-lg relative justify-center ${selectedTab === index ? 'text-black' : 'text-light-gray'}`}
                        onClick={() => onSelectTab(index)}
                    >
                        {t(tab.label)}
                    </button>
                    <div className={`absolute bottom-[-2.5px] h-[4px] ${selectedTab === index ? 'bg-black rounded-full w-full' : ''}`} />
                </div>
            ))}
        </div>
    );
}

export default TabSwitcher;
