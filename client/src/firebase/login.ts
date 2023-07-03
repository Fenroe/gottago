import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./auth"

export const login = async (email:string, password:string, callback?: (user:any) => void) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        const { user } = credentials
        if (callback) callback(user)
        } catch (err) {
        console.log(err)
    }
}