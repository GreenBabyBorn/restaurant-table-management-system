import React from "react";
import { TableType } from "../types";

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
      <button
        onClick={() => onWalkIn(table.id)}
        className="bg-green-500 text-white p-2 m-1 rounded"
      >
        Seat Walk-In at Table {table.id}
      </button>
    );
  } else if (table.status === "occupied") {
    return (
      <button
        onClick={() => onClearTable(table.id)}
        className="bg-purple-500 text-white p-2 m-1 rounded"
      >
        Clear Table {table.id}
      </button>
    );
  } else {
    return null; // Don't show anything for reserved tables in this control
  }
};

export default TableStatusControl;
