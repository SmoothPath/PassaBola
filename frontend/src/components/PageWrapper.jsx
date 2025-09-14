import React from "react";
import VoltarButton from "./VoltarButton";

export default function PageWrapper({ children }) {
  return (
    <div className="p-4">
      <VoltarButton />
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
