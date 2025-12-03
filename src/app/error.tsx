"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro capturado:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 space-y-6 text-center">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Algo deu errado
          </h2>
          <p className="text-gray-600">
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
        </div>
        <Button
          onClick={reset}
          className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-full"
        >
          Tentar novamente
        </Button>
      </Card>
    </div>
  );
}
