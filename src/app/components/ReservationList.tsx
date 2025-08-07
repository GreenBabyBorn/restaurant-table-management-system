import React from "react";
import { ReservationType } from "../types";
import { Button } from "@/components/ui/button";
import FormattedDateDisplay from "./FormattedDateDisplay"; // Import the new component

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
      {reservations.map((res) => {
        return (
          <div key={res.id} className="border p-4 mb-2 shadow-md rounded">
            <p>
              Table {res.tableId}: {res.guestName} ({res.partySize}) at{" "}
              <FormattedDateDisplay dateTime={res.dateTime} />
            </p>
            <p>{res.specialRequests}</p>
            <div className="flex  gap-2 mt-2">
              <Button onClick={() => onEditReservation(res)}>Edit</Button>
              <Button
                onClick={() => onCancelReservation(res.id)}
                className=" "
                variant={"secondary"}
              >
                Cancel
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationList;
