import { useState } from "react";
import type { Tarea } from "../types/database";

interface Props {
    tarea: Tarea
    onActualizar: (id: string, completada: boolean) => Promise<void>
    onEliminar: (id: string) => Promise<void>
}

export function TaskItem({ tarea, onActualizar, onEliminar }: Props) {
    const [eliminado, setEliminado] = useState(false)
    const [actualizado, setActualizado]

    const handleEliminar = async () => {
        if (!confirm('¿Eliminar esta tarea?')) return
        setEliminado(true)
        await onEliminar(tarea.id)
    }

    const handleActualizar = async () => {
        if(!confirm)
    }

    return (
        <div style={{ display:'flex', gap:'1rem', alignItems:'center',
            padding:'1rem', border:'1px solid #000000', borderRadius:'15px',
            marginBottom:'0.75rem', opacity: eliminado ? 0.5 : 1,
            backgroundColor:'#ffffff' }}>
            <input type='checkbox' checked={tarea.completada}
                onChange={() => onActualizar(tarea.id, !tarea.completada)}
                style={{ width:'1.2rem', height:'1.2rem', cursor:'pointer' }} />
            <div style={{ flex:1 }}>
                <strong style={{
                    textDecoration: tarea.completada ? 'line-through' : 'none',
                    color: tarea.completada ? '#a82200' : 'black' }}>
                    {tarea.titulo}
                </strong>
                {tarea.descripcion && (
                    <p style={{ margin:0, color:'#000000', fontSize:'0.9rem' }}>
                        {tarea.descripcion}
                    </p>
                )}
            </div>
            <button onClick={handleEliminar} disabled={eliminado}
                style={{ color:'#ef4444', cursor:'pointer',
                    background:'none', border:'none', fontSize:'0.9rem' }}>
                Eliminar
            </button>
            <button onClick={handleActualizar} > </button>
        </div>
    )
}