import React, { useState } from "react";
import { TableType, ReservationType } from "../types";

type ReservationFormProps = {
  selectedTable: TableType | null;
  onSubmit: (reservationData: Omit<ReservationType, "id" | "tableId">) => void;
  onCancel: () => void;
};

const ReservationForm = ({
  selectedTable,
  onSubmit,
  onCancel,
}: ReservationFormProps) => {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [dateTime, setDateTime] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState<string | null>(null); // New state for error messages

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if partySize exceeds selectedTable.seats
    if (selectedTable && partySize > selectedTable.seats) {
      setError(
        `Party size (${partySize}) cannot exceed table capacity (${selectedTable.seats}).`,
      );
      return;
    }

    onSubmit({ guestName, phone, partySize, dateTime, specialRequests });
    setGuestName("");
    setPhone("");
    setPartySize(1);
    setDateTime("");
    setSpecialRequests("");
    setError(null); // Clear any previous errors on successful submission
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">
        Make Reservation for Table {selectedTable?.id} (Seats:{" "}
        {selectedTable?.seats})
      </h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Party Size"
          value={partySize}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setPartySize(isNaN(value) ? 1 : value);
            setError(null);
          }}
          className="border p-2 mb-2 w-full"
          min="1"
          max={selectedTable?.seats || 100}
          required
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          placeholder="Special Requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
