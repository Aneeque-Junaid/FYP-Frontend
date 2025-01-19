"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface BlackAndWhiteSelectProps {
  options: Option[];
  onChange: (value: string) => void;
}

const Select: React.FC<BlackAndWhiteSelectProps> = ({ options, onChange }) => {
  return (
    <div className="relative inline-block w-full max-w-xs">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-gray-900 text-white rounded-md px-6 py-3 pr-10 focus:outline-none cursor-pointer text-sm transition-all duration-300 ease-in-out hover:bg-gray-700"
        defaultValue="ASL"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-gray-900 text-white hover:bg-gray-700"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default Select;
