import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext(null);

export const TabContainer = ({ className, children }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	return (
		<TabContext.Provider
			value={{
				activeTabIndex: activeTabIndex,
				setActiveTab: (index) => setActiveTabIndex(index)
			}}
		>
			<div className={className}>{children}</div>
		</TabContext.Provider>
	);
};

export const TabMenu = ({ children, index }) => {
	const { activeTabIndex, setActiveTab } = useContext(TabContext);
	return (
		<button
			className={`border rounded-md px-2 py-2 inline-block ${
				index === activeTabIndex ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'
			}`}
			onClick={() => setActiveTab(index)}
		>
			{children}
		</button>
	);
};

export const TabPanel = ({ children, index }) => {
	const { activeTabIndex } = useContext(TabContext);
	if (index === activeTabIndex) return children;
};
