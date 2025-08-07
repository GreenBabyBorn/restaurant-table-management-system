import React from "react";
import { TableType } from "../types";

type WalkInSeatingProps = {
  availableTables: TableType[];
  onWalkIn: (tableId: number) => void;
};

const WalkInSeating = ({ availableTables, onWalkIn }: WalkInSeatingProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Walk-In</h2>
      {availableTables.map((table) => (
        <button
          key={table.id}
          onClick={() => onWalkIn(table.id)}
          className="bg-green-500 text-white p-2 m-1 rounded"
        >
          Seat Walk-In at Table {table.id}
        </button>
      ))}
    </div>
  );
};

export default WalkInSeating;
