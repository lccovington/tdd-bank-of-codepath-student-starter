import * as React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios'
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"


export default function TransactionDetail() {

  const [hasFetched, setHasFetched] = useState(false)
  const [transaction, setTransaction] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { transactionId } = useParams()

  useEffect(() => {
    const fetchTransactionById = async () => {

      setIsLoading(true)

      if(!transactionId) {
        return;
      }
      try {
        const result = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
        if (result?.data?.transaction) {
          setTransaction(result.data.transaction)
        }
      } catch (err) {
        setError(err)
      }

      setIsLoading(false)
      setHasFetched(true)

    }
    
    fetchTransactionById();

  }, [transactionId])

  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId} hasFetched={hasFetched}/>
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null, hasFetched}) {
  
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        {Object.keys(transaction).length == 0 && hasFetched == true ? <h1>Not Found</h1> : null}
        <p className="category">{transaction.category}</p>
      </div>

      <div className="card-content">
        <p className="description">{transaction.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )
}
