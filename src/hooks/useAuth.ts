import { useState, useEffect } from "react"
import { authService } from "../services/authService"
import type { User } from '@supabase/supabase-js'

export function useAuth(){
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        // Obtener sesion actual al cargal la app
        authService.getSession().then(({data: {session }}) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })
        
        // Escuchar cambios de sesion (login, logout, refresh de token)
        const { data: { subscription }} = authService.onAuthStateChange(
            (_event, session) => setUser(session?.user ?? null)
        )
        return () => subscription.unsubscribe()
    }, [])

    const singUp = async (email: string, password: string) =>{
        const { data, error } = await authService.singUp(email, password)
        if (error) throw error
        return data
    }
    const singIn = async (email: string, password: string) => {
        const { data, error } = await authService.singIn(email,password)
        if (error) throw error
    }

    const singOut = async () => {
        const { error } = await authService.singOut()
        if (error) throw error
    }

    return { user, loading, singUp, singIn, singOut}
}