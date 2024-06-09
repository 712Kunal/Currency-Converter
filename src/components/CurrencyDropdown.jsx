import React from 'react'

function CurrencyDropdown({
  currencies,
  currency,
  setcurrency,
  title = "",
}) {
  return (
    <div>
      <label className='block font-medium'>{title}</label>
      <div className='relative'>
        <select value={currency} onChange={(e)=>{setcurrency(e.target.value)}} 
        className='text-black w-full p-2 border border-gray-500 rounded-md
        shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500'>

          {currencies.map((currency) => {
            return (
              <option value={currency} key={currency}>{currency}</option>);
          })}
        </select>
      </div>
    </div>
  )
}

export default CurrencyDropdown