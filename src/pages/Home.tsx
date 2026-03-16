import { useTasks } from '../hooks/useTask'
import { TaskForm } from '../components/TaskForm'
import { TaskItem } from '../components/TaskItem'
import { Link } from 'react-router-dom'
import { useRealtimeTasks } from '../hooks/useRealtimeTask'
import { UsePresence } from '../hooks/usePresence'
import { RealtimeIndicator } from '../components/RealtimeIndicator'
import { useAuthContext } from '../context/AuthContext'



export function Home() {
  const { tareas, loading, error, crearTarea, actualizarTarea, eliminarTarea } =
useTasks()
  const { conectado } = useRealtimeTasks()
  const { onlineUsers } = UsePresence('sala-principal')
  const { signOut } = useAuthContext()

  if (loading) return <div>Cargando tareas...</div>
  if (error)   return <div style={{ color:'red' }}>Error: {error}</div>

  return (
    <div style={{ maxWidth:'800px', margin:'2rem auto', padding:'0 1rem' }}>

      {/* Barra de navegación */}
      <nav style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom:'1.5rem',
        padding:'0.75rem 1rem', background:'#f8fafc', borderRadius:'10px' }}>
        <div style={{ display:'flex', gap:'1rem' }}>
          <Link to='/'>📋 Mis Tareas</Link>
          <Link to='/dashboard'>📊 Dashboard</Link>
        </div>
        <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
          <RealtimeIndicator conectado={conectado} />
          <span style={{ fontSize:'0.85rem', color:'#64748b' }}>
            👥 {onlineUsers.length} en linea
          </span>
          <button onClick={signOut}>Salir</button>
        </div>
      </nav>

      <h1>📋 Mis Tareas</h1>
      <TaskForm
        onCrear={async (titulo, descripcion) => { await crearTarea({ titulo, descripcion }) }}
      />
      {tareas.length === 0
        ? <p style={{ color:'#94a3b8' }}>No tienes tareas aún. ¡Crea una!</p>
        : tareas.map(t => (
            <TaskItem key={t.id} tarea={t}
              onActualizar={async (id, completada) => { await actualizarTarea(id, { completada }) }}
              onEliminar={eliminarTarea}
            />
          ))
      }
      <p style={{ color:'#94a3b8', fontSize:'0.9rem' }}>
        {tareas.filter(t => t.completada).length} / {tareas.length} completadas
      </p>
    </div>
  )
}