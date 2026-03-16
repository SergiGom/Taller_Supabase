import { useState } from "react";
import { useNavigate, Link} from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";

export function Login(){
    const { signIn } = useAuthContext()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState ('')
    const [error, setError] = useState ('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(''); setLoading(true)
        try {
            await signIn (email, password)
            navigate('/home')
        } catch (err: any){
            setError (err.message || 'Credenciales Incorrectas')
        } finally { setLoading(false)}
    }

    return (
  <div style={{ 
    minHeight:'100vh', 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor:'#242424'
  }}>
    <div style={{ 
      background:'white', 
      borderRadius:'16px', 
      padding:'2.5rem', 
      width:'100%',
      maxWidth:'400px',
      boxShadow:'0 4px 24px rgba(0,0,0,0.2)'
    }}>
      <h1 style={{ color:'#213547', marginBottom:'1.5rem', fontSize:'2rem', textAlign:'center' }}>
        Iniciar Sesión
      </h1>
      {error && <p style={{ color:'red', marginBottom:'1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type='password' placeholder='Contraseña' value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type='submit' disabled={loading} style={{
          width:'100%',
          marginTop:'0.5rem',
          padding:'0.75rem',
          backgroundColor:'#646cff',
          color:'white',
          border:'none',
          borderRadius:'8px',
          fontSize:'1rem',
          cursor:'pointer'
        }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ textAlign:'center', marginTop:'1rem', color:'#64748b' }}>
        ¿No tienes cuenta? <Link to='/register'>Regístrate aquí</Link>
      </p>
    </div>
  </div>
)
}