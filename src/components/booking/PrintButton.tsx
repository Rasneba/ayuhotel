"use client";

import { Printer } from "@/components/ui/Icons";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-outline-dark btn-sm">
      <Printer size={16} /> Print confirmation
    </button>
  );
}
