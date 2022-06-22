import { BrowserRouter, Routes, Route } from "react-router-dom"
import * as React from "react"
import { useState } from 'react';
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState([]);
  const [filterInputValue, setFilterInputValue] = useState('');

  return (
    
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
      <main>
      <Routes>

      <Route path="/" 
      element={<Home 
      transactions={transactions} 
      setTransactions={setTransactions}
      transfers={transfers}
      setTransfers={setTransfers}
      error={error}
      setError={setError}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      filterInputValue={filterInputValue}
      />} />
      <Route path="/transactions/:transactionId" 
        element={<TransactionDetail />}/>

      </Routes>
      </main>
      </BrowserRouter>
    </div>
    
  )
}
