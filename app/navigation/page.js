'use client'
import MainLayout from "../layouts/main/MainLayout"
import BusinessAndTourSearch from "./components/BusinessAndTourSearch"

export default function Navigation(){
    return(
        <MainLayout>
            <div className="container mx-auto my-10">
                <BusinessAndTourSearch ></BusinessAndTourSearch>
            </div>
        </MainLayout>
    )
}