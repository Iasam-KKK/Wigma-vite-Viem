"use client";

import { useConnect, useAccount, useSendTransaction } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState } from 'react';
import { sepolia } from 'viem/chains';
import { parseEther } from 'viem'

export const PayButton = () => {
  const { connectAsync } = useConnect()
  const { address } = useAccount()
  const { sendTransactionAsync } = useSendTransaction()
  const [started, setStarted] = useState(false)
  const [errors, setErrors] = useState('')
  const [completed, setCompleted] = useState(false)

  const handlePayment = async () => {
    try {
      setErrors('')
      setStarted(true)
      if(!address) {
        await connectAsync({ chainId: sepolia.id, connector: injected()})
      }

      // Set a fixed price in ETH, less than 0.0002 ETH
      const ethPrice = 0.0001 // This is 0.0001 ETH
      const weiAmount = parseEther(ethPrice.toString())

      const data = await sendTransactionAsync({
        to: '0xF594d5A585D321CcBA1E72Bfe89962bbaeAf99F5',
        value: weiAmount,
        chainId: sepolia.id,
      })

      setCompleted(true)
      console.log(data)
    } catch(err) {
      console.log(err)
      setStarted(false)
      setErrors("Payment failed. Please try again.")
    }
  }

  return (
    <>
      {!completed && (
        <button 
          disabled={started}
          className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          onClick={handlePayment}
        >
          {started ? "Confirming..." : "Pay 0.0001 ETH"}
        </button>
      )}
      {completed && <p className='text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4'>Thank you for your payment.</p>}
      {errors && <p className='text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4'>{errors}</p>}
    </>
  )
}