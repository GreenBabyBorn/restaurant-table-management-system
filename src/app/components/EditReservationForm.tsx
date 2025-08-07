import React, { useState, useEffect } from "react";
import { ReservationType } from "../types";

type EditReservationFormProps = {
  reservation: ReservationType;
  onSave: (updatedReservation: ReservationType) => void;
  onCancel: () => void;
};

const EditReservationForm = ({
  reservation,
  onSave,
  onCancel,
}: EditReservationFormProps) => {
  const [guestName, setGuestName] = useState(reservation.guestName);
  const [phone, setPhone] = useState(reservation.phone);
  const [partySize, setPartySize] = useState(reservation.partySize);
  const [dateTime, setDateTime] = useState(reservation.dateTime);
  const [specialRequests, setSpecialRequests] = useState(
    reservation.specialRequests,
  );

  useEffect(() => {
    setGuestName(reservation.guestName);
    setPhone(reservation.phone);
    setPartySize(reservation.partySize);
    setDateTime(reservation.dateTime);
    setSpecialRequests(reservation.specialRequests);
  }, [reservation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...reservation,
      guestName,
      phone,
      partySize,
      dateTime,
      specialRequests,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Edit Reservation for Table {reservation.tableId}
        </h2>
        <form onSubmit={handleSubmit}>
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
            onChange={(e) => setPartySize(parseInt(e.target.value))}
            className="border p-2 mb-2 w-full"
            min="1"
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
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReservationForm;
