'use client'
//AQUI HACE IMPORT
import { useAuth } from "@/app/context/AuthContext";

export default function Payment(){
    //Gets the user that's logged
    const { user } = useAuth();
    //AQUI VAN LAS FUNCIONES DE JAVASCRIPT - REACT

    return (
      <>
        <h1>PRUEBAS METODOS DE PAGO</h1>
        {/* AQUI VA CODIGO PRUEBA */}
        <p>kalsjdlkjasd</p>
      </>
    );
}