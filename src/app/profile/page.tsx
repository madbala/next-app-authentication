"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
  const router=useRouter()
  const [user, setUser] = useState("")
  const getUserData =async ()=>{
    const res = await axios.get('/api/users/me');
    
     const {data:{data:{username=""}={}}={}}=res??{}
    setUser(username)
    
  }
  useEffect(() => {
    getUserData()
  }, [])
const onLogout=async ()=>{
  try {
    await axios.get("/api/users/logout")
    toast.success("Logout Successful")
    router.push("/login")
  } catch (error:any) {
    console.log("Error: ",error.message)
    toast.error(error.message)
  }
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile of <span className="border rounded bg-orange-500 text-white px-5 py-2">{user}</span></h1>
      <hr />
      <p className="m-4">Profile page</p>
      <hr />
      <button className="p-4 px-6 mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded" onClick={onLogout}>Log out</button>
    </div>
  );
};

export default Profile;
