import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div className="p-4">
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
