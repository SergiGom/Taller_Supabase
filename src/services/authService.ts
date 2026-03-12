import { supabase  } from "../lib/supabaseClient";

export const authService = {
    getSession: () =>
        supabase.auth.getSession(),
    getUser: () =>
        supabase.auth.getUser(),

    singUp: (email: string, password: string) =>
        supabase.auth.signInWithPassword({ email, password}),

    singIn: (email: string, password: string) =>
        supabase.auth.signInWithPassword({email, password}),

    // Login con proveedor OAuth: Google, Github, Discord...

    singInWithProvider: (provider: 'google' | 'github' | 'discord') =>
        supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: window.location.origin}
        }),

    singInWithMagicLink: (email: string) =>
        supabase.auth.signInWithOtp({email}),

    singOut: () =>
        supabase.auth.signOut(),

    updatePassword: (newPassword: string) =>
        supabase.auth.updateUser({ password: newPassword}),

    onAuthStateChange: (
        callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
    ) => supabase.auth.onAuthStateChange(callback),
}