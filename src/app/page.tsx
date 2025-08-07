"use client";
import { useState, useEffect } from "react";
import { TableType, ReservationType, AnalyticsType } from "./types";
import Table from "./components/Table";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import AnalyticsDisplay from "./components/AnalyticsDisplay";
import EditReservationForm from "./components/EditReservationForm";
import TableStatusControl from "./components/TableStatusControl";

const initialTables: TableType[] = [
  { id: 1, status: "available", seats: 4, x: 50, y: 50 },
  { id: 2, status: "occupied", seats: 6, x: 150, y: 50 },
  { id: 3, status: "reserved", seats: 2, x: 250, y: 50 },
  { id: 4, status: "available", seats: 8, x: 50, y: 150 },
];

const initialReservations: ReservationType[] = [
  {
    id: 1,
    tableId: 3,
    guestName: "John Doe",
    phone: "123-456-7890",
    partySize: 2,
    dateTime: "2025-08-07T19:00",
    specialRequests: "Window seat",
  },
];

export default function Home() {
  const [tables, setTables] = useState<TableType[]>(initialTables);
  const [reservations, setReservations] =
    useState<ReservationType[]>(initialReservations);
  const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<ReservationType | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsType>({
    dailyCovers: 0,
    peakHours: [],
    avgDiningTime: 0,
  });

  const handleTableClick = (table: TableType) => {
    setSelectedTable(table);
    if (table.status === "available") {
      setShowReservationForm(true);
    } else {
      setShowReservationForm(false);
    }
  };

  const handleReservationSubmit = (
    reservationData: Omit<ReservationType, "id" | "tableId">,
  ) => {
    if (!selectedTable) return;

    const newReservation: ReservationType = {
      id: reservations.length + 1,
      tableId: selectedTable.id,
      ...reservationData,
    };
    setReservations([...reservations, newReservation]);
    setTables(
      tables.map((t) =>
        t.id === selectedTable.id ? { ...t, status: "reserved" } : t,
      ),
    );
    setShowReservationForm(false);
    updateAnalytics();
  };

  const handleCancelReservation = (reservationId: number) => {
    const reservationToCancel = reservations.find(
      (r) => r.id === reservationId,
    );
    if (!reservationToCancel) return;

    setReservations(reservations.filter((r) => r.id !== reservationId));
    setTables(
      tables.map((t) =>
        t.id === reservationToCancel.tableId
          ? { ...t, status: "available" }
          : t,
      ),
    );
    updateAnalytics();
  };

  const handleEditReservation = (reservation: ReservationType) => {
    setEditingReservation(reservation);
  };

  const handleSaveEditedReservation = (updatedReservation: ReservationType) => {
    setReservations(
      reservations.map((res) =>
        res.id === updatedReservation.id ? updatedReservation : res,
      ),
    );
    setEditingReservation(null);
    updateAnalytics(); // Call updateAnalytics after reservations are updated
  };

  const handleCancelEdit = () => {
    setEditingReservation(null);
  };

  const handleWalkIn = (tableId: number) => {
    setTables(
      tables.map((t) => (t.id === tableId ? { ...t, status: "occupied" } : t)),
    );
    updateAnalytics();
  };

  const handleClearOccupiedTable = (tableId: number) => {
    setTables(
      tables.map((t) => (t.id === tableId ? { ...t, status: "available" } : t)),
    );
    updateAnalytics();
  };

  const updateAnalytics = () => {
    const dailyCovers = reservations.reduce((sum, r) => sum + r.partySize, 0);
    const peakHours = ["18:00-20:00"];
    const avgDiningTime = 90;
    setAnalytics({ dailyCovers, peakHours, avgDiningTime });
  };

  useEffect(() => {
    updateAnalytics();
  }, [reservations]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Restaurant Table Management System
      </h1>
      <div className="flex gap-4">
        <div className="relative w-3/4 h-96 border">
          {tables.map((table) => (
            <Table key={table.id} table={table} onClick={handleTableClick} />
          ))}
        </div>
        <div className="w-1/4">
          {showReservationForm && selectedTable && (
            <ReservationForm
              selectedTable={selectedTable}
              onSubmit={handleReservationSubmit}
              onCancel={() => setShowReservationForm(false)}
            />
          )}
          <ReservationList
            reservations={reservations}
            onCancelReservation={handleCancelReservation}
            onEditReservation={handleEditReservation}
          />

          <div className="mt-4">
            <h2 className="text-lg font-bold">Table Actions</h2>
            {tables.map((table) => (
              <TableStatusControl
                key={table.id}
                table={table}
                onWalkIn={handleWalkIn}
                onClearTable={handleClearOccupiedTable}
              />
            ))}
          </div>

          <AnalyticsDisplay analytics={analytics} />
        </div>
      </div>

      {editingReservation && (
        <EditReservationForm
          reservation={editingReservation}
          onSave={handleSaveEditedReservation}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
