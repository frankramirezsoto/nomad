'use client'
import { useState, useEffect } from 'react';
import HeaderHome from "./includes/HeaderHome";
import Footer from "./includes/Footer";
import Loading from "../../components/Loading";

const MainLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>{
      window.addEventListener("storage", function () {
        let res = localStorage.getItem('isLoading')
        res === 'false' ? setIsLoading(false) : setIsLoading(true)
      })
    })

  return (
    <>
      {isLoading ? <Loading /> : <div></div>}
      <div>
        <HeaderHome></HeaderHome>
        <main>
          {children}
        </main>
        <Footer /> 
      </div>
    </>
  );
};

export default MainLayout;
