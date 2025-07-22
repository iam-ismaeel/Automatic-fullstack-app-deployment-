import React from "react";
import Review from "./review";
import Redeem from "./redeem";
import Summary from "./summary";
import { ChevronDown } from "@/components/svg";
import {Cart} from "@interfaces/cart";

function Aside({data}:{data: Cart}) {
  const [accordion, setAccordion] = React.useState([
    {
      element: <Review data={data}/>,
      active: true,
      title: "Order Review",
    },
    {
      element: <Redeem />,
      active: true,
      title: "Redeem your point",
    },
    {
      element: <Summary data={data}/>,
      active: true,
      title: "Billing Summary",
    },
  ]);

  const handleToggle = (index: number) => {
    const newAccordion = [...accordion];
    if (newAccordion[index].active) {
      newAccordion[index].active = false;
    } else {
      newAccordion[index].active = true;
    }
    setAccordion(newAccordion);
  };

  return (
      <aside className="w-[370px] md:w-full space-y-5">
        {accordion.map((item, index) => (
            <div
                key={index}
                className="bg-white p-5 rounded"
                style={{
                  boxShadow: "0px 2px 6px 0px #00000024",
                }}
            >
              <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggle(index)}
              >
                <h4 className="text-base-bold font-open-sans">{item.title}</h4>

                <ChevronDown
                    className={`w-[13px] h-[9px] ${
                        item.active ? "" : "transform rotate-180"
                    }`}
                />
              </div>

              {item.active && item.element}
            </div>
        ))}
      </aside>
  );
}

export default Aside;
