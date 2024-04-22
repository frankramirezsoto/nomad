'use client'
import MainLayout from "../layouts/main/MainLayout"
import BusinessAndTourSearch from "./components/BusinessAndTourSearch"
import { useSearchParams } from 'next/navigation';

export default function Navigation(){
    //Gets search param 
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('s');

    return(
        <MainLayout>
            <div className="container mx-auto my-10">
                <BusinessAndTourSearch initialQuery={searchQuery || ""}></BusinessAndTourSearch>
            </div>
        </MainLayout>
    )
}