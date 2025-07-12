import { BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis,Bar, Tooltip } from "recharts";


function MeteoriteBarChart({data,id,t}){
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow">
                    <p className="font-semibold">{`${t.year}: ${label}`}</p>
                    <p className="text-blue-600">{`Type: ${data.type}`}</p>
                    <p className="text-gray-700">{`${t.count}: ${data.count}`}</p>
                </div>
            );
        }
        return null;
    };
    return(
        
        <div id={id}>
             <h3 className="text-xl font-semibold mb-4" style={{alignContent:"center",fontFamily:"Inconsolata", marginLeft:"10%"}}>
           {t.barChartTitle}
            </h3>
        <ResponsiveContainer height={500} width={500}>
            <BarChart   data={data}  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                    dataKey = "year"
                    textAnchor="end"
                    height={60}
                    interval={1}
                    angle={-45}
                    />
                    <YAxis/>
                    <Tooltip content={CustomTooltip}/>
                    <Legend/>
                    <Bar
                    dataKey = "count"
                    fill="#001E50"
                    name={t.barChartLegend}
                    />
                
            </BarChart>

        </ResponsiveContainer>
        </div>
    )
}
export default MeteoriteBarChart