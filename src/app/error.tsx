"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Next.js Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-red-50 p-4 font-sans">
      <h2 className="mb-4 text-2xl font-bold text-red-600">
        ¡Vaya! Algo salió mal en la aplicación.
      </h2>
      <div className="mb-6 rounded-md bg-white p-4 shadow-md max-w-2xl overflow-auto border border-red-200">
        <p className="font-bold text-slate-800 mb-2">Mensaje de error:</p>
        <pre className="text-sm text-red-500 whitespace-pre-wrap font-mono">
          {error.message || "Error desconocido"}
        </pre>
        {error.stack && (
          <>
            <p className="font-bold text-slate-800 mt-4 mb-2">Stack trace (para depurar):</p>
            <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono overflow-x-auto">
              {error.stack}
            </pre>
          </>
        )}
      </div>
      <button
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Intentar recargar la página
      </button>
    </div>
  );
}
