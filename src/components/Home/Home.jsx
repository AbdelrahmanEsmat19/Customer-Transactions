import React from 'react'
import { Link } from 'react-router-dom'
import CustomerTable from "../CustomerTable/CustomerTable"
export default function Home() {
  return <>
    <div className='w-full h-full flex justify-center items-center my-5'>
      <CustomerTable></CustomerTable>
    </div>
  </>
}
