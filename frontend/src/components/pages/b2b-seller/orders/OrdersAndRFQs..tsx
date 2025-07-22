"use client";
import Flex from "@/components/common/Flex";
import SearchBar from "@/components/common/searchbar";

import { Button, Tab } from "rizzui";
import OrderTable from "./OrderTable";
import RFQTable from "./RFQTable";

const OrdersAndRFQs = () => {
  return (
    <div className="rounded-lg border mt-6 bg-white">
      <Flex className="p-4">
        <SearchBar placeholder="Search for an order" />
        <Flex>
          <Button size={"sm"} variant={"flat"}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 6.10352V4.30352C17 3.18341 17 2.62336 16.782 2.19553C16.5903 1.81921 16.2843 1.51325 15.908 1.3215C15.4802 1.10352 14.9201 1.10352 13.8 1.10352H8.2C7.0799 1.10352 6.51984 1.10352 6.09202 1.3215C5.71569 1.51325 5.40973 1.81921 5.21799 2.19553C5 2.62336 5 3.18341 5 4.30352V6.10352M5 17.1035C4.07003 17.1035 3.60504 17.1035 3.22354 17.0013C2.18827 16.7239 1.37962 15.9152 1.10222 14.88C1 14.4985 1 14.0335 1 13.1035V10.9035C1 9.22336 1 8.38328 1.32698 7.74154C1.6146 7.17706 2.07354 6.71812 2.63803 6.4305C3.27976 6.10352 4.11984 6.10352 5.8 6.10352H16.2C17.8802 6.10352 18.7202 6.10352 19.362 6.4305C19.9265 6.71812 20.3854 7.17706 20.673 7.74154C21 8.38328 21 9.22336 21 10.9035V13.1035C21 14.0335 21 14.4985 20.8978 14.88C20.6204 15.9152 19.8117 16.7239 18.7765 17.0013C18.395 17.1035 17.93 17.1035 17 17.1035M14 9.60352H17M8.2 21.1035H13.8C14.9201 21.1035 15.4802 21.1035 15.908 20.8855C16.2843 20.6938 16.5903 20.3878 16.782 20.0115C17 19.5837 17 19.0236 17 17.9035V16.3035C17 15.1834 17 14.6234 16.782 14.1955C16.5903 13.8192 16.2843 13.5132 15.908 13.3215C15.4802 13.1035 14.9201 13.1035 13.8 13.1035H8.2C7.0799 13.1035 6.51984 13.1035 6.09202 13.3215C5.71569 13.5132 5.40973 13.8192 5.21799 14.1955C5 14.6234 5 15.1834 5 16.3035V17.9035C5 19.0236 5 19.5837 5.21799 20.0115C5.40973 20.3878 5.71569 20.6938 6.09202 20.8855C6.51984 21.1035 7.07989 21.1035 8.2 21.1035Z"
                stroke="#47586E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </Flex>
      </Flex>
      {/* {mockData?.length ? ( */}
      <Tab>
        <Tab.List>
          <Tab.ListItem>Orders</Tab.ListItem>
          <Tab.ListItem>Request For QQuotation</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <OrderTable />
          </Tab.Panel>
          <Tab.Panel>
            <RFQTable />
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
      {/* ) : (
        <EmptyData />
      )} */}
    </div>
  );
};

export default OrdersAndRFQs;
