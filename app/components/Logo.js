'use client'
import { FaHiking } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Logo(){
    const router = useRouter();

    return (
        <button onClick={() => router.push("/")} className="border border-2 border-white p-2 px-3 flex items-center">
              <FaHiking size={20}/>
              <h1 className="font-extrabold ms-2">NOMADA</h1>
        </button>
    )
}