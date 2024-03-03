"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Successful!!", response.data);
            toast.success("Login Successful!!");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login Uncuccessful!!", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="">
            <h1>{loading ? "Loading..." : "Log In" }</h1>
            <div>
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
                <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "Enter Details" : "Login here"}</button>
                <br />
                <Link href="/signup">Click here to sign up page</Link>
            </div>
        </div>
    );
};