
import { LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line, ResponsiveContainer } from "recharts"

function MeteoriteLineChart({data,t}){
    
    return(
        <>
        <h3 className="text-xl font-semibold mb-4" style={{alignContent:"center",fontFamily:"Inconsolata", marginLeft:"10%"}}>
      {t.lineChartTitle}({data.reduce((sum, item) => sum + item.count, 0)} total)
      </h3>
     <ResponsiveContainer width={500} height={450}>
     <LineChart data={data}
         margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" name={t.lineChartLegend} dataKey="totalMass" stroke="#001E50"  strokeWidth={2}/>
    </LineChart>
    </ResponsiveContainer>
        </>
    )
}

export default MeteoriteLineChart;