import React from 'react'
import Header from '../components/common/Header'
import UserItem from '../components/items/UserItem'
import CustomizeSearch from '../components/search/CustomizeSearch'
import 'react-tabs/style/react-tabs.css';
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../components/example/TabSelector";


export default function ListFollowPage() {

    const [selectedTab, setSelectedTab] = useTabs([
        "account",
        "company",
        "team",
        "billing",
    ]);
    return (
        <div>

            <Header />
            <div className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left'>
                        <div >
                            <nav className="flex border-b border-gray-300">
                                <TabSelector
                                    isActive={selectedTab === "account"}
                                    onClick={() => setSelectedTab("account")}
                                >
                                    My Account
                                </TabSelector>
                                <TabSelector
                                    isActive={selectedTab === "company"}
                                    onClick={() => setSelectedTab("company")}
                                >
                                    Company
                                </TabSelector>
                                <TabSelector
                                    isActive={selectedTab === "team"}
                                    onClick={() => setSelectedTab("team")}
                                >
                                    Team Members
                                </TabSelector>
                                <TabSelector
                                    isActive={selectedTab === "billing"}
                                    onClick={() => setSelectedTab("billing")}
                                >
                                    Billing
                                </TabSelector>
                            </nav>
                            <div className="p-4">
                                <TabPanel hidden={selectedTab !== "account"}>My Account</TabPanel>
                                <TabPanel hidden={selectedTab !== "company"}>Company</TabPanel>
                                <TabPanel hidden={selectedTab !== "team"}>Team Members</TabPanel>
                                <TabPanel hidden={selectedTab !== "billing"}>Billing</TabPanel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
