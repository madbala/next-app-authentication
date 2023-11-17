"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isValid, setIsValid] = useState(true)


    const resetUserPassword = async () => {
        try {
            await axios.post("/api/users/resetpassword", { token, newPassword })
            router.push("/login")

        } catch (error: any) {

            console.log(error)

        }
    }

    const onSubmit = () => {

        if (newPassword.length && confirmPassword.length) {

            if (newPassword.toLowerCase() === confirmPassword.toLowerCase()) {

                setIsValid(false)
            } else {
                setIsValid(true)
            }
        } else {
            setIsValid(true)
        }



    }
    useEffect(() => {

        if (!isValid && newPassword.length && confirmPassword.length && token) {


            if (token?.length > 0) {
                resetUserPassword()
            }



        }
    }, [isValid])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]

        setToken(urlToken)

    }, [])

    return <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-center text-center text-2xl mb-4">{"Reset Password"}</h1>
        <hr />

        <label htmlFor="email" className="mb-4">Enter password </label>
        {isValid}
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="userEmail"
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your email"
        />
        <label htmlFor="email" className="mb-4">Confirm password</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="userEmail"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your email"
        />
        <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={onSubmit}
        >
            Submit</button>
        <br />
        <br />
        {isValid && (<h1>Password does not match</h1>)}


    </div>
}
export default ResetPassword