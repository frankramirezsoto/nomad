'use client'

import BusinessLayout from "@/app/layouts/business/BusinessLayout";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";

export default function BusinessPortal(){

    const { businessUser } = useAuth();
    const router = useRouter();
    
    if(!businessUser){
        router.push('/business/login');
    }
    return(
        <BusinessLayout></BusinessLayout>
    )
}