"use client"
import React, { useEffect, useState } from 'react'

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';

import TabSwitcher from '../components/ui/common/TabSwitcher';
import ProfileContent from './components/ProfileContent';
import TransactionsContent from './components/Transactions';
import CommissionsContent from './components/Commissions';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';


const TABS = [
    { label: 'Profile' },
    { label: 'Transactions' },
    { label: 'Commissions' },
]

function Profile() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { user } = useAuth();
    const router = useRouter();

    const handleTabChange = (tab: number) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user]);

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='h-auto pt-5 pb-20'>
                    <TabSwitcher selectedTab={selectedTab} onSelectTab={handleTabChange} tabs={TABS} />
                    <div className='flex-1'>
                        {selectedTab === 0 && <ProfileContent />}
                        {selectedTab === 1 && <TransactionsContent />}
                        {selectedTab === 2 && <CommissionsContent />}
                    </div>
                </div>
            </Wrapper>
        </section >
    )
}

export default Profile;