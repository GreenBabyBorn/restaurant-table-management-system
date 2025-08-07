import React from "react";
import { AnalyticsType } from "../types";

type AnalyticsDisplayProps = {
  analytics: AnalyticsType;
};

const AnalyticsDisplay = ({ analytics }: AnalyticsDisplayProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Analytics</h2>
      <p>Daily Covers: {analytics.dailyCovers}</p>
      <p>Peak Hours: {analytics.peakHours.join(", ")}</p>
      <p>Avg Dining Time: {analytics.avgDiningTime} mins</p>
    </div>
  );
};

export default AnalyticsDisplay;
