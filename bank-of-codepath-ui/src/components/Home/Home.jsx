import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from 'axios'

import { useEffect} from 'react';

export default function Home(props) {

  //console.log(props)

  useEffect(async () => {

    props.setIsLoading(true)
    
      try {
        const transactionData = await axios.get('http://localhost:3001/bank/transactions');
        console.log(transactionData)
        //props.setTransactions(response.data.transactionData)
      } catch (error) {
        console.log(error)
        // setError("Error fetching products.")
        // setIsFetching(false)
      }
  });
  return (
    <div className="home">
      <AddTransaction />
      <BankActivity />
    </div>
  )
}
