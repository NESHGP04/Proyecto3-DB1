// src/layout/DefaultLayout.jsx
// Componente de layout que envuelve páginas con encabezado y navegación.

import React from "react";
import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* Puedes agregar más enlaces según necesites */}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
