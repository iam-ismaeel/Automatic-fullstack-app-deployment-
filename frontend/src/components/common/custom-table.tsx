import React, { ReactNode } from "react";
import { cn, Table } from "rizzui";
import TablePagination from "./table-pagination";
import { PaginationEvents } from "@/interfaces/table";
import { ScrollArea } from "./scroll-area";

interface TableDemoProps {
  TableHeadComponent?: React.JSX.Element;
  TableTopBar?: React.JSX.Element;
  children: ReactNode;
  containerClassName?: string | undefined;
  currentPage?: number;
  totalPages?: number;
  paginationEvents?: PaginationEvents;
}

export function CustomTable({
  TableHeadComponent,
  children,
  TableTopBar,
  containerClassName,
  currentPage,
  totalPages,
  paginationEvents,
}: TableDemoProps) {
  return (
    <div className={cn(containerClassName)}>
      <div className="mb-4">{TableTopBar}</div>
      <ScrollArea className="w-full">
        <Table className="">
          <Table.Header>{TableHeadComponent}</Table.Header>
          <Table.Body>{children}</Table.Body>
        </Table>
      </ScrollArea>

      {currentPage && totalPages ? (
        <div className="mt-8">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginationEvents={paginationEvents}
          />
        </div>
      ) : null}
    </div>
  );
}
