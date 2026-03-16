import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DonutChart({ data }: { data: any[] }) {
  const total = data.reduce((s,d)=>s+d.value,0)
  return (
    <div style={{ background:'white', borderRadius:'12px', padding:'1.5rem',
      boxShadow:'0 2px 8px rgba(0,0,0,0.06)', minHeight:'320px',
      display:'flex', flexDirection:'column' }}>
      <h3 style={{ margin:'0 0 0.5rem', fontSize:'1rem', color:'#1e293b' }}>🍩 Distribución</h3>
      {total===0
        ? <p style={{ color:'#94a3b8' }}>Sin tareas</p>
        : <ResponsiveContainer width='100%' height={280}>
            <PieChart margin={{ top:0, right:0, bottom:0, left:0 }}>
              <Pie data={data} cx='50%' cy='45%'
                innerRadius={60} outerRadius={100}
                paddingAngle={3} dataKey='value'>
                {data.map((e,i)=><Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v)=>[`${v} tareas`]} />
              <Legend wrapperStyle={{ color:'#1e293b', fontSize:'0.85rem' }} />
            </PieChart>
          </ResponsiveContainer>
      }
    </div>
  )
}