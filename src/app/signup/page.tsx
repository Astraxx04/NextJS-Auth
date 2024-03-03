"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
// import { axios } from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Successful!!", response.data);
            toast.success("SignUp Successful!!");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Uncuccessful!!", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="">
            <h1>{loading ? "Loading..." : "Sign Up" }</h1>
            <div>
                <div className="py-4">
                    <label htmlFor="username">Username:</label>
                    <input className="text-black" type="text" id="username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="Enter username" />   
                </div>
                <div className="py-4">
                    <label htmlFor="email">Email:</label>
                    <input className="text-black" type="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Enter email" />
                </div>
                <div className="py-4">
                    <label htmlFor="password">Password:</label>
                    <input className="text-black" type="text" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Enter password" />    
                </div>
            </div>
            <div>
                <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "Enter Details" : "Signup here"}</button>
                <br />
                <Link href="/login">Click here to login page</Link>
            </div>
        </div>
    );
};