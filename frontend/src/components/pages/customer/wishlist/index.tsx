"use client";

import React from "react";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { useLocale } from "next-intl";
import WishlistTable from "./WishlistTable";

const WishlistPage: React.FC = () => {
  const localActive = useLocale();

  return (
    <div className="">
      <div className="bg-white p-6 rounded-md border mb-6 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Wishlist Items</h2>
        <button className="text-red-600 flex items-center">
          <IonIcon icon={addCircleOutline} className="mr-1" />
          <Link
            href={`/${localActive}`}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <span className="text-base-regular">Add more items</span>
          </Link>
        </button>
      </div>

      <WishlistTable />
    </div>
  );
};

export default WishlistPage;
