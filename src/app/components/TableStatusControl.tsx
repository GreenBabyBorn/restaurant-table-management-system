import React from "react";
import { TableType } from "../types";
import { Button } from "@/components/ui/button";

type TableStatusControlProps = {
  table: TableType;
  onWalkIn: (tableId: number) => void;
  onClearTable: (tableId: number) => void;
};

const TableStatusControl: React.FC<TableStatusControlProps> = ({
  table,
  onWalkIn,
  onClearTable,
}) => {
  if (table.status === "available") {
    return (
      <Button onClick={() => onWalkIn(table.id)}>
        Seat Walk-In at Table {table.id}
      </Button>
    );
  } else if (table.status === "occupied") {
    return (
      <Button onClick={() => onClearTable(table.id)} variant="secondary">
        Clear Table {table.id}
      </Button>
    );
  } else {
    return null; // Don't show anything for reserved tables in this control
  }
};

export default TableStatusControl;
