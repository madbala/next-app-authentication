"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",

  });
  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log("Login SUCCESS",response)
        router.push("/profile")
        toast.success('Successfully created!');

    } catch (error: any) {
      console.log("Error : ", error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-center text-2xl mb-4">{loading?"Processing":"Login"}</h1>
      <hr />

      <label htmlFor="email" className="mb-4">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user?.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="mb-4">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user?.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        {buttonDisabled?"No Login":"Login"}
      </button>
      <Link href="/signup">Visit Sign up page</Link>
    </div>
  );
};

export default Login;
