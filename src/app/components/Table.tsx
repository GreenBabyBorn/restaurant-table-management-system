import React from "react";
import { TableType } from "../types";

interface TableProps {
  table: TableType;
  onClick: (table: TableType) => void;
}

const Table: React.FC<TableProps> = ({ table, onClick }) => {
  const getColor = (status: TableType["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "occupied":
        return "bg-red-500";
      case "reserved":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`absolute w-12 h-12 rounded-full ${getColor(table.status)} text-white flex items-center justify-center cursor-pointer`}
      style={{ left: table.x, top: table.y }}
      onClick={() => onClick(table)}
    >
      {table.id} ({table.seats})
    </div>
  );
};

export default Table;
