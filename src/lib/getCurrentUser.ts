import { cookies } from "next/headers";
import { verifyToken } from "./jwt";


export async function getCurrentUser() {
   
    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value

    if(!token)throw new Error("token not find")

        const decode = verifyToken(token)

        if(!decode) throw new Error("token not valid")

        return decode.userId
    
}

