"use client";
import React, { useState } from 'react';

interface DueDateProps {
  value?: string;
  onDateChange?: (date: string) => void;
  label?: string;
}

export const DueDate: React.FC<DueDateProps> = ({
  value,
  onDateChange,
  label = "Select Due Date",
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
    if (onDateChange) {
      onDateChange(dateValue);
    }
  };

  const displayValue = value !== undefined ? value : selectedDate;

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="date"
        value={displayValue}
        onChange={handleChange}
        min={getTodayString()}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
      />
    </div>
  );
};

export default DueDate;