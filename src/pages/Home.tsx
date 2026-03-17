import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from "../hooks/useTask"
import { useAuthContext } from '../context/AuthContext'
import { TaskForm } from '../components/TaskForm'
import { TaskItem } from '../components/TaskItem'
import { Chat, ChatToggle } from '../components/Chat'
import '../App.css'

export function Home() {
  const { tareas, loading, error, crearTarea, actualizarTarea, eliminarTarea } = useTasks()
  const { signOut } = useAuthContext()
  const [chatOpen, setChatOpen ] = useState(false)

  if (loading) return <div>Cargando tareas...</div>
  if (error)   return <div style={{ color:'red' }}>Error: {error}</div>

return (
  <>
  
    <div style={{ minHeight:'100vh', backgroundColor:'#242424', padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'800px', margin:'0 auto' }}>
        <main>
        {/* Barra de navegación */}
        <nav style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', marginBottom:'1.5rem',
          padding:'1.5rem 1rem', background:'#ffffff', borderRadius:'10px' }}>
          <div style={{ display:'flex', gap:'1rem' }}>
            <Link to='/home'>📋 Mis Tareas</Link>
            <Link to='/dashboard'>📊 Dashboard</Link>
          </div>
          <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
            <button onClick={signOut} style={{
              backgroundColor:'#ef4444', color:'white',
              border:'none', borderRadius:'8px',
              padding:'0.5rem 1.5rem', cursor:'pointer' }}>
              Salir
            </button>
          </div>
        </nav>

        {/* Contenedor principal */}
        <div style={{ backgroundColor:'#ffffff', borderRadius:'16px',
          padding:'2rem', boxShadow:'0 4px 24px rgba(0,0,0,0.3)' }}>
          <h1 style={{ color:'black', marginTop:10, marginBottom:'1.5rem', alignItems: "center" }}>
            📋 Mis Tareas
          </h1>
          <TaskForm
            onCrear={async (titulo, descripcion) => { await crearTarea({ titulo, descripcion }) }}
          />
          {tareas.length === 0
            ? <p style={{ color:'#000000' }}>No tienes tareas aún. ¡Crea una!</p>
            : tareas.map(t => (
                <TaskItem key={t.id} tarea={t}
                  onActualizar={async (id, completada) => { await actualizarTarea(id, { completada }) }}
                  onEliminar={eliminarTarea}
                />
              ))
          }
          <p style={{ color:'#000000', fontSize:'0.9rem', marginBottom:0 }}>
            {tareas.filter(t => t.completada).length} / {tareas.length} completadas
          </p>
        </div>
          </main>
                  
      </div>
        {/* Chat */}
      <div className="chat-container">
        <Chat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        {!chatOpen && <ChatToggle onClick={() => setChatOpen(true)} />}
      </div>
    </div>

    </>
  )
}
