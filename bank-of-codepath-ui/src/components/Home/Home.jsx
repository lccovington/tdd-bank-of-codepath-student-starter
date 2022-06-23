import * as React from "react"
import { useEffect } from 'react';
import axios from 'axios'
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home(props) {

  const filteredTransactions = props.transactions?.filter((transaction) => {
    return (props.filterInputValue.length ? transaction.description?.toLowerCase()
      .includes(props.filterInputValue.toLowerCase()) : props.transactions)
  })

  const handleOnSubmitNewTransaction = (event) => {
    return;
  }

  const handleOnCreateTransaction = async() => {
    props.setIsCreating(true)
    await axios.post("http://localhost:3001/bank/transactions", {transaction: props.newTransactionForm})
    .catch((err) => {
      props.setError(err)
      props.setIsCreating(false)
    })
    .then(res => {
      props.setTransactions((prevTransactions) => [...prevTransactions, res?.data?.transaction])
    })
    .finally(() => {
      props.setNewTransactionForm({
        category: "",
        description: "",
        amount: 0
      })
      props.setIsCreating(false)
    })
  }

  useEffect(async () => {

    props.setIsLoading(true)
    
      try {
        const transactionResponse = await axios.get('http://localhost:3001/bank/transactions');
        props.setTransactions(transactionResponse.data.transactions)

        const transferResponse = await axios.get('http://localhost:3001/bank/transfers');
        props.setTransfers(transferResponse.data.transfers)
      } catch (error) {
        props.setError(error)
      }

      props.setIsLoading(false)
  }, []);

  return (
    <div className="home">
      <AddTransaction       
      isCreating={props.isCreating}
      setIsCreating={props.setIsCreating} 
      form={props.newTransactionForm}
      setForm={props.setNewTransactionForm}
      handleOnSubmit={handleOnCreateTransaction}/>
      {props.isLoading ? <h1>Loading...</h1> : 
      <BankActivity transfers={props.transfers} transactions={filteredTransactions}/>}
      {props.error ? <h2 className="error"> {props.error} </h2>: null}
    </div>
  )
}
