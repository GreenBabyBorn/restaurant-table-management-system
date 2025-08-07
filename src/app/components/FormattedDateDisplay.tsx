import React, { useState, useEffect } from "react";

type FormattedDateDisplayProps = {
  dateTime: string;
};

const FormattedDateDisplay: React.FC<FormattedDateDisplayProps> = ({
  dateTime,
}) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    try {
      const date = new Date(dateTime);
      setFormattedDate(date.toLocaleDateString());
    } catch (e) {
      console.error("Error formatting date:", e);
      setFormattedDate(dateTime); // Fallback to raw string on error
    }
  }, [dateTime]);

  return <>{formattedDate}</>;
};

export default FormattedDateDisplay;
