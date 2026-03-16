import { useState } from "react";

interface Props {
    onCrear: (titulo: string, descripcion: string) => Promise<void>
}

export function TaskForm({ onCrear }: Props) {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!titulo.trim()) return
        setSubmitting(true)
        try {
            await onCrear(titulo.trim(), descripcion.trim())
            setTitulo(''); setDescripcion('')
        } catch(err) { console.error(err) }
        finally { setSubmitting(false) }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom:'2rem' }}>
            <h2 style={{ color:'white', marginBottom:'1rem' }}>Nueva Tarea</h2>
            <input type='text' placeholder='Título' value={titulo}
                onChange={e => setTitulo(e.target.value)} required
                style={{ marginBottom:'0.75rem' }} />
            <textarea placeholder='Descripción (opcional)'
                value={descripcion} onChange={e => setDescripcion(e.target.value)}
                style={{
                    width:'100%',
                    padding:'0.75rem 1rem',
                    border:'1px solid #e2e8f0',
                    borderRadius:'8px',
                    fontSize:'1rem',
                    fontFamily:'inherit',
                    boxSizing:'border-box',
                    marginBottom:'1rem',
                    backgroundColor:'#f8fafc',
                    color:'#213547',
                    resize:'vertical',
                    minHeight:'80px'
                }} />
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <button type='submit' disabled={submitting || !titulo.trim()}
                    style={{
                        backgroundColor:'#3700ff',
                        color:'white',
                        border:'none',
                        borderRadius:'8px',
                        padding:'0.6rem 1.5rem',
                        fontSize:'1rem',
                        cursor:'pointer',
                        opacity: submitting || !titulo.trim() ? 0.6 : 1
                    }}>
                    {submitting ? 'Guardando...' : '+ Agregar Tarea'}
                </button>
            </div>
        </form>
    )
}