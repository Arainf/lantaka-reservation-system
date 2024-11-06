// Tabs.js
import React, { useState, createContext, useContext } from 'react';

const TabsContext = createContext();

export function Tabs({ children, defaultValue, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={`flex ${className}`} role="tablist">{children}</div>;
}

export function TabsTrigger({
  value,
  children,
  className,
  activeClass = 'bg-white text-black',
  inactiveClass = 'bg-gray-200 text-gray-700',
}) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  if (!setActiveTab) {
    console.error('TabsTrigger must be used within a Tabs component');
    return null;
  }

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${
        activeTab === value ? activeClass : inactiveClass
      }`}
      role="tab"
      aria-selected={activeTab === value}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div className={`p-4 ${className}`} role="tabpanel" tabIndex={0}>
      {children}
    </div>
  );
}