import { createContext, useContext, ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import type { User } from "@supabase/supabase-js"


interface AuthContextType {
    user: User | null
    loading: boolean
    singUp: (email: string, pass: string) => Promise<any>
    singIn: (email: string, pass: string) => Promise<any>
    singOut: () => Promise<void> 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider ({ children }: {children: ReactNode}){
    const Auth = useAuth()
    return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>
}

export function useAuthContext(){
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuthContext debe usarse dentro de <AuthProvider>')
    return ctx
}