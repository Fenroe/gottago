import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard, Home, Login, Signup } from "./pages"
import { AuthWrapper } from "./components"
import { auth, onAuthStateChanged } from "./firebase"
import { useSetAtom } from "jotai"
import { userAtom } from "./store"
import { User } from "@firebase/auth-types"

const App = () => {
    const setUser = useSetAtom(userAtom)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user as User)
        } else {
            setUser(null)
        }
    })
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<AuthWrapper refuseAuth><Login /></AuthWrapper>}/>
                    <Route path="/signup" element={<AuthWrapper refuseAuth><Signup /></AuthWrapper>} />
                    <Route path="/dashboard" element={<AuthWrapper><Dashboard /></AuthWrapper>} />
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App