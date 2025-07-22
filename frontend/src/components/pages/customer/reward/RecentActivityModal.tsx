import React, { useState } from "react";
import { Button, cn, Table } from "rizzui";
import RecentActivity from "./RecentActivity";
import { CustomTable } from "@/components/common/custom-table";
import { Clock } from "lucide-react";
import { formatDate } from "date-fns";

type CardDetails = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type RecentActivityModalProps = {
  onClose: () => void;
  activities: any[];
};

const RecentActivityModal: React.FC<RecentActivityModalProps> = ({
  onClose,
  activities,
}) => {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-[2px]"
      />

      <div className="fixed z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-[650px] flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-[#23262F] font-semibold">
            Recent Activities
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <CustomTable>
            {activities.map((activity, i) => (
              <Table.Row
                key={i}
                className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
              >
                <Table.Cell className="!text-sm flex items-center">
                  <div
                    className={`p-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    } mr-4`}
                  >
                    <Clock />
                  </div>
                  <div>
                    <div className="text-black text-sm whitespace-nowrap">
                      {activity.description}
                    </div>
                    <div
                      className={cn(
                        "text-xs",
                        activity.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      )}
                    >
                      {activity.status}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {formatDate(activity.date, "dd/MM/yy")}
                </Table.Cell>

                <Table.Cell className="!text-sm whitespace-nowrap">
                  <div
                    className={cn(
                      "text-xs font-medium",
                      activity.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    )}
                  >
                    +{activity.points} Points
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </CustomTable>
        </div>

        <Button
          type="submit"
          className="bg-[#F7DFDE] dark:hover:bg-[#F7DFDE] text-guyana px-6 py-2 self-end mt-4"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default RecentActivityModal;
