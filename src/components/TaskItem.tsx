import { useState } from "react";
import type { Tarea } from "../types/database";

interface Props {
  tarea: Tarea
  onActualizar: (id: string, cambios: { completada?: boolean; titulo?: string; descripcion?: string }) => Promise<void>
  onEliminar: (id: string) => Promise<void>
}

export function TaskItem({ tarea, onActualizar, onEliminar }: Props) {
  const [eliminando, setEliminando] = useState(false)
  const [actualizando, setActualizando] = useState(false)
  const [editando, setEditando] = useState(false)
  const [titulo, setTitulo] = useState(tarea.titulo)
  const [descripcion, setDescripcion] = useState(tarea.descripcion || '')

  const handleToggle = async () => {
    if (actualizando) return
    setActualizando(true)
    try {
      await onActualizar(tarea.id, { completada: !tarea.completada })
    } finally { setActualizando(false) }
  }

  const handleEliminar = async () => {
    if (!confirm('¿Eliminar esta tarea?')) return
    setEliminando(true)
    try {
      await onEliminar(tarea.id)
    } catch { setEliminando(false) }
  }

  const handleGuardar = async () => {
    if (!titulo.trim()) return
    setActualizando(true)
    try {
      await onActualizar(tarea.id, {
        titulo: titulo.trim(),
        descripcion: descripcion.trim() || undefined
      })
      setEditando(false)
    } finally { setActualizando(false) }
  }

  const handleCancelar = () => {
    setTitulo(tarea.titulo)
    setDescripcion(tarea.descripcion || '')
    setEditando(false)
  }

  // —— Modo edición ——
  if (editando) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem',
        padding:'1rem', border:'1px solid #334155', borderRadius:'8px',
        marginBottom:'0.75rem', backgroundColor:'#1e293b',
        opacity: actualizando ? 0.7 : 1 }}>
        <input type='text' value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder='Título de la tarea'
          disabled={actualizando} autoFocus />
        <textarea value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder='Descripción (opcional)'
          disabled={actualizando} rows={2}
          style={{ width:'100%', padding:'0.75rem 1rem', border:'1px solid #e2e8f0',
            borderRadius:'8px', fontSize:'1rem', fontFamily:'inherit',
            boxSizing:'border-box', backgroundColor:'#f8fafc',
            color:'#213547', resize:'vertical', minHeight:'60px' }} />
        <div style={{ display:'flex', gap:'0.5rem', justifyContent:'flex-end' }}>
          <button onClick={handleCancelar} disabled={actualizando}
            style={{ padding:'0.5rem 1rem', borderRadius:'8px',
              background:'#334155', color:'white', border:'none', cursor:'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={actualizando || !titulo.trim()}
            style={{ padding:'0.5rem 1rem', borderRadius:'8px',
              background:'#646cff', color:'white', border:'none', cursor:'pointer' }}>
            Guardar
          </button>
        </div>
      </div>
    )
  }

  // —— Modo normal ——
  return (
    <div style={{ display:'flex', gap:'1rem', alignItems:'center',
      padding:'1rem', border:'1px solid #334155', borderRadius:'8px',
      marginBottom:'0.75rem', opacity: eliminando ? 0.5 : 1,
      backgroundColor:'#1e293b' }}>
      <input type='checkbox' checked={tarea.completada}
        onChange={handleToggle} disabled={actualizando}
        style={{ width:'1.2rem', height:'1.2rem', cursor:'pointer', accentColor:'#646cff' }} />
      <div style={{ flex:1, textAlign:'left' }}>
        <strong style={{
          textDecoration: tarea.completada ? 'line-through' : 'none',
          color: tarea.completada ? '#7f1d1d' : 'white' }}>
          {tarea.titulo}
        </strong>
        {tarea.descripcion && (
          <p style={{ margin:0, color:'#94a3b8', fontSize:'0.9rem' }}>
            {tarea.descripcion}
          </p>
        )}
        {tarea.created_at && (
          <p style={{ margin:0, fontSize:'0.75rem', color:'#64748b', marginTop:'0.25rem' }}>
            {new Date(tarea.created_at).toLocaleDateString('es-ES', {
              day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'
            })}
          </p>
        )}
      </div>
      <div style={{ display:'flex', gap:'0.25rem' }}>
        <button onClick={() => { setTitulo(tarea.titulo); setDescripcion(tarea.descripcion || ''); setEditando(true) }}
          style={{ padding:'0.4rem', background:'transparent', border:'none',
            color:'#94a3b8', cursor:'pointer', borderRadius:'6px' }}
          title='Editar'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button onClick={handleEliminar} disabled={eliminando}
          style={{ padding:'0.4rem', background:'transparent', border:'none',
            color:'#ef4444', cursor:'pointer', borderRadius:'6px' }}
          title='Eliminar'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}