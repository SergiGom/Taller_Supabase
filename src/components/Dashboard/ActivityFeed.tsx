import type { Tarea } from '../../types/database'

export function ActivityFeed({ tareas }: { tareas: Tarea[] }) {
  const fmt = (d: string) => new Date(d).toLocaleString('es-CO',{
    day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })

  return (
    <div style={{ background:'white', borderRadius:'12px', padding:'1.5rem',
      boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
      <h3 style={{ margin:'0 0 1rem', fontSize:'1rem', color:'#1e293b' }}>🕐 Actividad reciente</h3>
      {tareas.length===0
        ? <p style={{ color:'#1e293b' }}>Sin actividad</p>
        : tareas.map(t => (
          <div key={t.id} style={{ display:'flex', gap:'0.75rem',
            padding:'0.6rem', marginBottom:'0.4rem', borderRadius:'8px',
            background: t.completada ? '#f0fdf4' : '#fffbeb',
            borderLeft:`3px solid ${t.completada ? '#10b981' : '#f59e0b'}` }}>
            <span>{t.completada ? '✅' : '⏳'}</span>
            <div style={{ flex:1, overflow:'hidden' }}>
              <p style={{ margin:0, fontWeight:600, fontSize:'0.85rem',
                whiteSpace:'nowrap', overflow:'hidden',
                textOverflow:'ellipsis', color:'#1e293b' }}>{t.titulo}</p>
              <p style={{ margin:0, fontSize:'0.75rem', color:'#64748b' }}>
                {fmt(t.created_at)}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}