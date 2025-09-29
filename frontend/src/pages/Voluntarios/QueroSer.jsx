import React from "react";

export default function QueroSer() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Quero me voluntariar</h1>
      <p>
        Obrigado pelo interesse em se voluntariar! Por favor, entre em contato pelo email:{" "}
        <a href="mailto:voluntarios@exemplo.com" className="text-purple-600 underline">
          voluntarios@exemplo.com
        </a>{" "}
        ou ligue para (11) 99999-9999.
      </p>
    </div>
  );
}
