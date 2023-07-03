import { atom } from "jotai"
import { User } from "@firebase/auth-types"

export const userAtom = atom<User | null>(null)