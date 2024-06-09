import React, { useEffect, useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown';
import { GoArrowSwitch } from "react-icons/go";


const CurrencyConverter = () => {
    const [currencies, setcurrencies] = useState([]);
    const [amount, setamount] = useState(1);

    const [fromCurrency, setfromCurrency] = useState("USD");
    const [toCurrency, settoCurrency] = useState("INR");

    const [convertedAmount, setConvertedAmount] = useState();
    const [converting, setConverting] = useState(false);

    const fetchingCurrencies = async () => {
        try {
            const response = await fetch("https://api.frankfurter.app/currencies");
            const data = await response.json();

            setcurrencies(Object.keys(data));
        } catch (error) {
            console.log("Error fetching:", error);
        }
    }

    // This useEffect will be called when our components loads
    useEffect(() => {
        fetchingCurrencies();
    }, [])

    console.log(currencies); //give the currencies of the countries

    const convertCurrency = async () => {
        if (!amount) {
            return setConverting(true);
        }
        try {
            const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await response.json();

            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.log("Error fetching:", error);
        } finally {
            setConverting(false);
        }
    }

    const handlefavourites = (currency) => {
        // Add to the favourites
    }

    const swapCurrencies = () => {
        setfromCurrency(toCurrency);
        settoCurrency(fromCurrency);
    }

    return (
        <div className=' text-white max-w-xl bg-white mx-auto my-10 p-5 rounded-lg bg-opacity-5 backdrop-blur-md backdrop-filter'>
            <h2 className='mb-5 font-semibold text-4xl underline text-white'>Currrecy Converter</h2>

            {/* dropdowns */}
            <div className='text-xl grid grid-cols-1 sm:grid-cols-3  gap-4 items-end'>
                <CurrencyDropdown currency={fromCurrency}
                    handlefavourites={handlefavourites}
                    setcurrency={setfromCurrency}
                    currencies={currencies}
                    title="From:" />

                {/* swapping currency component */}
                <div className='flex justify-center items-center mb-2'>
                    <button onClick={swapCurrencies} className='p-2 rounded-full bg-slate-500 w-11 h-11 cursor-pointer hover:bg-slate-600 hover:scale-90 hover:duration-200'>
                        <GoArrowSwitch />
                    </button>
                </div>

                <CurrencyDropdown currency={toCurrency}
                    handlefavourites={handlefavourites}
                    setcurrency={settoCurrency}
                    currencies={currencies}
                    title="To:" />
            </div>

            {/* Amount */}
            <div className='mt-4'>
                <label className='text-3xl block mb-2'>
                    Amount:
                </label>

                <input type="number"
                    className='w-full p-2 rounded-md shadow-sm border border-black focus:outline-none 
                focus:ring-2 focus:ring-rose-500 text-black'
                    value={amount}
                    onChange={(e) => { setamount(e.target.value) }} />
            </div>

            {/* convert button */}
            <div className='flex justify-end mt-6'>

                <button onClick={convertCurrency} className='px-5 py-2 bg-purple-950 text-xl text-white 
                rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2
                focus:ring-cyan-600 focus:ring-offset-2'>Convert</button>
            </div>

            {/* converted amount */}
            {convertedAmount && (
                <div className='mt-5 shadow-fuchsia-400 h-10 shadow-md text-2xl text-center rounded-xl font-sm text-white bg-green-950'>
                    Converted Amount : {convertedAmount}
                </div>
            )}
        </div>
    )
}

export default CurrencyConverter