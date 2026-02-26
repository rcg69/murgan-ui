import React from "react";
import { Button } from "@/components/ui/button";

export default function FilterButton({ onClick }) {
  return (
    <div className="flex justify-end w-full">
      <Button
        onClick={onClick}
        className="font-bold text-black !bg-white/30 backdrop-blur-md border border-white/40 hover:!bg-white/40 shadow-lg rounded-full flex items-center gap-2"
      >
        <span className="filter-icon">⚲</span>
        Filters
      </Button>
    </div>
  );
}
