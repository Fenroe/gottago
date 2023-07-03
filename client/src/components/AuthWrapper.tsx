import { useAtom } from "jotai"
import React from "react"
import { userAtom } from "../store"
import { Dashboard, Login } from "../pages"

type Props = {
    children?: React.ReactNode | React.ReactNode[],
    refuseAuth?: boolean
}

export const AuthWrapper:React.FC<Props> = ({ children, refuseAuth }: Props) => {
    const [user] = useAtom(userAtom)

    if (refuseAuth === true && user !== null) return <Dashboard />

    if (refuseAuth === false && user === null) return <Login />

    return children
}


AuthWrapper.defaultProps = {
    refuseAuth: false
}