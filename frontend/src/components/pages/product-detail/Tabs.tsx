// components/Tabs.tsx
"use client";
import React, { useState } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return <div>{children}</div>;
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    console.log("first", activeTab);
    setActiveTab(index);
  };

  return (
    <div className="tabs my-6">
      <div className="flex justify-center mb-4">
        {["Tab 1", "Tab 2", "Tab 3"].map((label, index) => (
          <button
            key={index}
            className={`tab tab-bordered ${
              activeTab === index ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 0 && (
          <Tab label="Tab 1">
            <div>Content for Tab 1</div>
          </Tab>
        )}
        {activeTab === 1 && (
          <Tab label="Tab 2">
            <div>Content for Tab 2</div>
          </Tab>
        )}
        {activeTab === 2 && (
          <Tab label="Tab 3">
            <div>Content for Tab 3</div>
          </Tab>
        )}
      </div>
    </div>
  );
};

export default Tabs;
