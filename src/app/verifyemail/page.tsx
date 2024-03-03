"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) 
        {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div>
            <h1>Verify Email</h1>
            <h3>{token? `${token}` : "No token"}</h3>

            {verified && (
                <div>
                    <h2>Email verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )
            }

            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )
            }
        </div>
    );

};