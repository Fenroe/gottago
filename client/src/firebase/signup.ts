import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "./auth"

export const signup = async (firstName:string, lastName:string, email:string, password:string, callback?: (user:any) => void) => {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        const { user } = credentials
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        })
        if (callback) callback(user)
    } catch (err) {
        console.log(err)
    }
}