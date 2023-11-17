"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
const ForgotPassword = () => {

  const [userEmail, setUserEmail] = useState("")
  const onResetPassword = async () => {
    try {

      const response = await axios.post("/api/users/forgotpassword", { userEmail })
      toast.success('Check your email to reset password');
      console.log(response)

    } catch (error: any) {
      console.log('error : ', error.message)

    }

  }
  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-center text-2xl mb-4">{"Forgot Password"}</h1>
      <hr />

      <label htmlFor="email" className="mb-4">Enter your email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="userEmail"
        type="text"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onResetPassword}
      >
        Submit</button>
      <br />
      <br />
      <Link href='/login'>Go back to Login page</Link>
    </div>
  )

}

export default ForgotPassword