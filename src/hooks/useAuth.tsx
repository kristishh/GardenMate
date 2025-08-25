import { auth } from "@/firebaseConfig"
import { onAuthStateChanged, UserInfo } from "firebase/auth"
import { useEffect, useState } from "react"

export default function useAuth() {
    const [user, setUser] = useState<UserInfo | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

    return { user }
} 