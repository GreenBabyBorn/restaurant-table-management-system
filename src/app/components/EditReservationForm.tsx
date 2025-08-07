import React, { useState, useEffect } from "react";
import { ReservationType } from "../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <Dialog open={true} onOpenChange={onCancel}>
      {" "}
      {/* Using Dialog component */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit Reservation for Table {reservation.tableId}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              type="text"
              placeholder="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Party Size"
              value={partySize}
              onChange={(e) => setPartySize(parseInt(e.target.value))}
              min={1}
              required
            />
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
            <Textarea
              placeholder="Special Requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReservationForm;
