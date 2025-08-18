type Tab = {
    label: string;
    count?: number;
};

type TabSwitcherProps = {
    selectedTab: string;
    onSelectTab: (index: string) => void;
    tabs: Tab[];
};

function TabSwitcher({ selectedTab, onSelectTab, tabs, }: TabSwitcherProps) {

    return (
        <div className='flex justify-between font-secondary relative text-center border-b border-border-gray'>
            {tabs.map((tab, index) => (
                <div key={index} className='flex-1 relative'>
                    <button
                        className={`h-11 gap-3 px-3 transition font-medium text-lg relative justify-center ${selectedTab === tab.label ? 'text-black' : 'text-light-gray'}`}
                        onClick={() => onSelectTab(tab.label)}
                    >
                        {tab.label}
                    </button>
                    <div className={`absolute bottom-[-2.5px] h-[4px] ${selectedTab === tab.label ? 'bg-black rounded-full w-full' : ''}`} />
                </div>
            ))}
        </div>
    );
}

export default TabSwitcher;
