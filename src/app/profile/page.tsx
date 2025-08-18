"use client"
import React, { useState } from 'react'

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';

import TabSwitcher from '../components/ui/common/TabSwitcher';
import ProfileContent from './components/ProfileContent';
import TransactionsContent from './components/Transactions';
import CommissionsContent from './components/Commissions';


const TABS = [
    { label: 'Profile' },
    { label: 'Transactions' },
    { label: 'Commissions' },
]

function Profile() {
    const [selectedTab, setSelectedTab] = useState("Profile");

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='h-auto pt-5 pb-20'>
                    <TabSwitcher selectedTab={selectedTab} onSelectTab={handleTabChange} tabs={TABS} />
                    <div className='flex-1'>
                        {selectedTab === "Profile" && <ProfileContent />}
                        {selectedTab === "Transactions" && <TransactionsContent />}
                        {selectedTab === "Commissions" && <CommissionsContent />}
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default Profile;