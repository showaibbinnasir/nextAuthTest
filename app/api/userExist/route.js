import client from "@/app/utility/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const users = client.db("authnexttest").collection("users")
        const { email } = await req.json()
        const user = await users.findOne({ email : email })
        return NextResponse.json({ user })
    } catch (error) {
        console.log(error);

    }
}