import React from "react";
import { ReservationType } from "../types";

type ReservationListProps = {
  reservations: ReservationType[];
  onCancelReservation: (id: number) => void;
  onEditReservation: (reservation: ReservationType) => void;
};

const ReservationList = ({
  reservations,
  onCancelReservation,
  onEditReservation,
}: ReservationListProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Reservations</h2>
      {reservations.map((res) => (
        <div key={res.id} className="border p-2 mb-2">
          <p>
            Table {res.tableId}: {res.guestName} ({res.partySize}) at{" "}
            {res.dateTime}
          </p>
          <p>{res.specialRequests}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEditReservation(res)}
              className="bg-blue-500 text-white p-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onCancelReservation(res.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationList;
