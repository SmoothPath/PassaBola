import { useState } from "react";
import { Link } from "react-router-dom";

export default function DropDown({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-agrandir whitespace-nowrap transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D1FA6] rounded-md px-2 py-1 text-[#7D1FA6]/80 hover:text-[#7D1FA6]"
      >
        {label}
      </button>

      {open && (
        <ul className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
