
import { supabase } from "../lib/supabaseClient";
import type { TareaInsert, TareaUpdate } from "../types/database";

export const taskService = {

    //===READ ========================================

getAll: () =>
    supabase
    .from('tareas')
    .select('*')
    .order('created_at', {ascending: false}),

getById: (id: string) =>
    supabase.from('tareas').select('*').eq('id', id).single(),

getByStatus: (completada: boolean)=>
    supabase
    .from('tareas')
    .select('*')
    .eq('completada', completada)
    .order('created_at', {ascending: false}),

search: (texto: string)=>
    supabase
    .from('tareas')
    .select('*')
    .ilike('titulo', `%${texto}%`) //Búsqueda sin distinguir mayusculas
    .order('created_at', {ascending: false}),


    //===CREATE ========================================
    create:  async (tarea: TareaInsert) => {
        const { data: { user }} = await supabase.auth.getUser()
        if (!user) throw new Error('No hay sesion activa')
    return supabase
        .from('tareas')
    .insert({...tarea, user_id: user.id})
    .select()
    .single()
    },
        


    // ===UPDATE========================================
    update: (id: string, cambios: TareaUpdate) =>
        supabase.from('tareas').update(cambios).eq('id', id).select().single(),

    toggleCompletada: (id: string, estadoActual: boolean) =>
        supabase
        .from('tareas')
        .update({ completada: !estadoActual})
        .eq('id', id)
        .select()
        .single(),

    // ===DELETE =========================================
    delete: (id:string) =>
        supabase.from('tareas').delete().eq('id', id),
    deleteCompleted: () =>
        supabase.from('tareas').delete().eq('completada', true),
 
}