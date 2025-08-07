export type TableType = {
  id: number;
  status: "available" | "occupied" | "reserved";
  seats: number;
  x: number;
  y: number;
};

export type ReservationType = {
  id: number;
  tableId: number;
  guestName: string;
  phone: string;
  partySize: number;
  dateTime: string;
  specialRequests: string;
};

export type AnalyticsType = {
  dailyCovers: number;
  peakHours: string[];
  avgDiningTime: number;
};
