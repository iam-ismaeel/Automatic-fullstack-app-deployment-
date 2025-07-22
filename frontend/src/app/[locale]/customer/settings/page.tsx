"use client";

import SecurityForm from "@/components/pages/affiliate-dashboard/settings/security-form";
import Support from "@/components/pages/affiliate-dashboard/settings/support";
import { Tab } from "rizzui";

const Page = () => {
  const tabs = [
    { label: "Password", component: <SecurityForm /> },
    { label: "Support", component: <Support /> },
  ];

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white lg:w-full w-4/5 p-4 rounded-lg shadow-lg">
        <Tab>
          <Tab.List className="flex flex-row border-b mb-4">
            {tabs.map((tab) => (
              <Tab.ListItem
                className="text-left px-4 py-2 cursor-pointer"
                key={tab.label}
              >
                {tab.label}
              </Tab.ListItem>
            ))}
          </Tab.List>
          <Tab.Panels className=" grow">
            {tabs.map((tab) => (
              <Tab.Panel className="p-4" key={tab.label}>
                {tab.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab>
      </div>
    </div>
  );
};

export default Page;
