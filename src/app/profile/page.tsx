"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router  = useRouter();
    const [data, setData] = useState("nada");

    const logout = async() => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful!!");
            router.push("/login");
        } catch (error: any) {
            console.log("Error logging out!!", error.message);
            toast.error(error.message);
        }
    }
    const getUserDetails = async() => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    };
    return(
        <div>
            <h1>Profile Page</h1>
            <h2>{data === "nada"? "Nada" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <br />
            <button onClick={logout}>Log Out</button>
            <br />
            <button onClick={getUserDetails}>Get User Details</button>
        </div>
    );
};