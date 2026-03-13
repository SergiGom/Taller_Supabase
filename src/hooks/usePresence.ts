import {useState, useEffect} from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuthContext } from '../context/AuthContext'

interface UsePresence { userId: string; email: string; online_at: string}

export function UsePresence(sala: string){
    const {user} = useAuthContext()
    const [onlineUsers, setOnlineUsers] = useState<UsePresence[]>([])

    useEffect (() =>{
        if (!user) return
        const channel = supabase.channel(sala)

        channel
        .on('presence', {event: 'sync'}, () =>{
            const state = channel.presenceState<UsePresence>()
            setOnlineUsers(Object.values(state).flat())
        })
        return () => { supabase.removeChannel(channel)}
    }, [user, sala])

    return {onlineUsers}
}
