import React from "react";

export default function StatsCard({ value, label }) {
  return (
    <div className="stat-card" style={{ borderTop: `6px solid $(color)`}}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}