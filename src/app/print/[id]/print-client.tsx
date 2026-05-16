"use client";

export default function PrintClient() {
  return (
    <div data-no-print className="fixed top-4 right-4 z-50">
      <button
        onClick={() => window.print()}
        className="rounded-md bg-black px-4 py-2 text-white text-sm"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}