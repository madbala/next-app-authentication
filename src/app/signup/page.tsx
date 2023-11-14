"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
    const router= useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  const onSignUp = async () => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup",user)
        console.log("SIGN UP SUCCESS",response)
        router.push("/login")
        toast.success('Successfully created!');
    } catch (error:any) {
        console.log("SIGN UP FAILED")
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    if(user.email.length>0 &&user.password.length>0 && user.username.length>0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
  
   
  }, [user])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-center text-2xl mb-4">{loading?"Processing":"Sign up"}</h1>
      <hr />
      <label htmlFor="username" className="mb-4">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user?.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignUp}
        
      >
       {buttonDisabled?"No sign up":"Sign up"} 
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
};

export default Signup;
