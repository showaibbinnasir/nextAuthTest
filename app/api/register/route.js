import client from "@/app/utility/database";
import { data } from "autoprefixer";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
// authnexttest
// dNJ9I1APv1WNhqhV
export async function POST(req) {
    try{
        const users =  client.db("authnexttest").collection("users")
        const {userName, email, password} =await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = users.insertOne({userName, email, password:hashedPassword})
        return NextResponse.json({message : "User created successfully", data : result}, {status : 201})

    }catch(error){
        return NextResponse.json({message : "Failed to create"}, {status : 500})
    }
}