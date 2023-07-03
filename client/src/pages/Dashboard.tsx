import { useAtom } from "jotai"
import { userAtom } from "../store"
import { Button } from "@chakra-ui/react"

export const Dashboard = () => {
    const [user] = useAtom(userAtom)
    return (
        <main>Hello {user !== null && user.displayName}</main>
    )
}
