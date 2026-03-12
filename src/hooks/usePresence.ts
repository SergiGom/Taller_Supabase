import {useState, useEffect} from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuthContext } from '../context/AuthContext'

interface UserPresence { userId: string; email: string; online_at: string}

export function UserPresence(sala: string){
    const {user} = useAuthContext()
    const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([])

    useEffect (() =>{
        if (!user) return
        const channel = supabase.channel(sala)

        channel
        .on('presence', {event: 'sync'}, () =>{
            const state = channel.presenceState<UserPresence>()
            setOnlineUsers(Object.values(state).flat())
        })
        return () => { supabase.removeChannel(channel)}
    }, [user, sala])

    return {onlineUsers}
}
