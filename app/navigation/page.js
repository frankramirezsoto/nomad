'use client'
import MainLayout from "../layouts/main/MainLayout"
import BusinessAndTourSearch from "./components/BusinessAndTourSearch"

export default function Navigation(){
    return(
        <MainLayout>
            <BusinessAndTourSearch></BusinessAndTourSearch>
        </MainLayout>
    )
}