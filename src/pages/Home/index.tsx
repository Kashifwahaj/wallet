import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { n_format } from '../../utils/common';
import { Currencies } from '../../utils/types';

interface props {
}

const Home: FC<props> = () => {

    // Props

    // States
    const [activeCurrency, setActiveCurrency] = useState<"NEP" | "BUSD">("NEP");
    const [data, setData] = useState<Currencies>({
        NEP:0,
        BUSD:0
    });

    
    // Functions

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
     
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const convertData = () => {
        if(activeCurrency === "NEP"){
            setData({
                ...data,
                BUSD:n_format(data.NEP * 3)
            })
        }else{
            setData({
                ...data,
                NEP:n_format(data.BUSD / 3)
            })
        }
    }

    const toggleActiveCurrency = () => {
        if(activeCurrency === "NEP"){
           setActiveCurrency("BUSD")
        }else{
            setActiveCurrency("NEP")
        }
    }

    // Side Effects
    useEffect(() => {
        convertData();
    }, [data[activeCurrency]])

    // JSX
    return (
        <div className="bg-gray-200 flex h-screen justify-center items-center">
            <div className="shadow-xl min-w-min w-96  px-8 py-5 bg-blue-900 rounded-xl border-2 border-white">
               <div className="text-3xl text-white">
                   Converter
               </div>
                <div className="bg-opacity-25 flex flex-col rounded-lg bg-gray-500 px-5 py-2 my-2">
                    <label className="text-white">{activeCurrency === "NEP" ? "NEP" :"BUSD" }</label>
                    <input type="number" name={activeCurrency === "NEP" ? "NEP" :"BUSD" } value={data[activeCurrency]} onChange={handleChange} className=" border border-gray-400 bg-opacity-25 flex flex-col text-white rounded-lg bg-gray-500 px-5 py-2 my-2" />
                </div>
                <div onClick={toggleActiveCurrency} className="flex cursor-pointer hover:opacity-30 justify-center items-center text-white my-5 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                </div>
                <div className="bg-opacity-25 flex flex-col rounded-lg bg-gray-500 px-5 py-2 my-2">
                    <label className="text-white"> {activeCurrency === "NEP" ? "BUSD" :"NEP" }</label>
                    <input type="number" name={activeCurrency === "NEP" ? "NEP" :"BUSD" } value={data[activeCurrency === "NEP" ? "BUSD":"NEP"]} onChange={handleChange} className="text-white border border-gray-400 bg-opacity-25 flex flex-col rounded-lg bg-gray-500 px-5 py-2 my-2" />
                </div>
                <div className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                    Check Wallet Details
                </div>
            </div>
        </div>
    )
}

export default Home
