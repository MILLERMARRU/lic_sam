"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login"); // Redirige si no hay sesión
      }
    };

    checkSession();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Bienvenido al dashboard admin</h1>
      <p>Contenido privado para usuarios logueados.</p>
    </div>
  );
}
