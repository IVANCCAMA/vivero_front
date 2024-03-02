import React from 'react';
import {
BarChart,
Bar,
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer,
PieChart,
Pie,
Cell,
AreaChart,
Area
} from 'recharts';
import './reportes.css';
function Reportes() {
// GRAFICA EN BARRA DE LOS 5 PRODUCTOS DE  ENTRADAS Y SALIDAS
    const reporteBarra = [
        { product: 'Pino', entrada: 1000, salida: 500 },
        { product: 'Rosa', entrada: 3500, salida: 3000 },
        { product: 'Margarita', entrada: 1000, salida: 3200 },
        { product: 'Margarita', entrada: 1220, salida: 300 },
        { product: 'Margarita', entrada: 2000, salida: 600 },
    ];
//GRAFICA EN TORTA DEL NIVEL DE INVENTARIO
const nInventario = [
    { name: 'Inventario bueno', value: 500 },
    { name: 'Inventario bajo', value: 300 },
    { name: 'Sin Inventario', value: 200 },
];
const COLORS = [ '#25B651', '#FE8F02', '#FE0000'];
function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}


// GRAFICA DE DOS LINEAS DE LA ENTRADA Y SALIDA
const reporteGraficas = [
        { name: 'Enero', Entrada: 0, salida: 0 },
        { name: 'Febrero',  Entrada: 10, salida: 50 },
        { name: 'Marzo',  Entrada: 30, salida: 800 },
        { name: 'Abril',  Entrada: 20, salida: 308 },
        { name: 'Mayo',  Entrada: 700, salida: 800 },
        { name: 'Junio',  Entrada: 600, salida: 300 },
        { name: 'Julio',  Entrada: 3490, salida: 400 },
        { name: 'Agosto',  Entrada: 300, salida: 430 },
        { name: 'Septiembre',Entrada: 1500, salida: 400 },
        { name: 'Octubre',  Entrada: 3000, salida: 430 },
        { name: 'Noviembre',  Entrada: 3500, salida: 400 },
        { name: 'Diciembre',  Entrada: 4000, salida: 300 },
    ];

    //INDICADOR DE STOCK
        const RADIAN = Math.PI / 180;
            const indicadorStock = [
                { name: 'Bajo', value: 45, color: '#25B651' },
                { name: 'Intermedio', value: 45, color: '#FFF200' },
                { name: 'Alto', value: 45, color: '#FE8F02' },
                { name: 'Muy Alto', value: 45, color: '#FE0000' },
            ];
            const cx = 200;
            const cy = 130;
            const iR = 70;
            const oR = 100;
            const value = 50;
            const needle = (value, indicadorStock, cx, cy, iR, oR, color) => {
                let total = 0;
                indicadorStock.forEach((v) => {
                    total += v.value;
                });
            
                let level = '';
                if (value <= 25) {
                    level = 'Bajo';
                } else if (value <= 100) {
                    level = 'Intermedio';
                } else if (value <= 205) {
                    level = 'Alto';
                } else {
                    level = 'Muy Alto';
                }
            
                const ang = 180.0 * (1 - value / total);
                const length = (iR + 2 * oR) / 3;
                const sin = Math.sin(-RADIAN * ang);
                const cos = Math.cos(-RADIAN * ang);
                const r = 5;
                const x0 = cx + 5;
                const y0 = cy + 5;
                const xba = x0 + r * sin;
                const yba = y0 - r * cos;
                const xbb = x0 - r * sin;
                const ybb = y0 + r * cos;
                const xp = x0 + length * cos;
                const yp = y0 + length * sin;
            
                return [
                    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
                    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
                    <text x={x0} y={y0} textAnchor="middle" fontSize="12" fill="#000">{level}</text>
                ];
            };
        
// GRAFICA EN LINEA SOLO UNO, UNIDADES DE STOCK
        const uStock = [
                { name: 'Enero', uv: 0, Stock: 0, amt: 0},
                { name: 'Febrero', uv: 3000, Stock: 1398,amt: 2210},
                { name: 'Marzo', uv: 2000, Stock: 9800, amt: 2290},
                { name: 'Abril', uv: 2780, Stock: 3908, amt: 2000},
                {name: 'Mayo',uv: 1890, Stock: 4800, amt: 2181},
                { name: 'Junio', uv: 2390, Stock: 3800, amt: 500},
                { name: 'Julio', uv: 3490, Stock: 4300, amt: 2100},
                { name: 'Agosto', uv: 3490, Stock: 4300, amt: 2100},
                { name: 'Septiembre', uv: 0, Stock: 0, amt: 2100},
                { name: 'Octubre', uv: 3490, Stock: 4300, amt: 2100},
                { name: 'Noviembre', uv: 3490, Stock: 4300, amt: 2100},
                { name: 'Diciembre', uv: 0, Stock: 0, amt: 2100},
            ];
return (
    <div className='main-dashboard'>
        <div className='main-title'>
        <h5>Dashboards Interactivos</h5>
        </div>
        <div className="div-reporte">
        <div className="L-Reporte">
                <div className="valor">
                <p>Bs</p>
                <p>1200</p>
            </div>
            <p style={{ fontWeight: 'bold' }}>Valor en stock</p>
            </div>
            <div className="L-Reporte">
            <div className="valor">
                <p>Bs</p>
                <p >100</p>
            </div>
                <p style={{ fontWeight: 'bold' }}>Valor en capital</p>
            </div>
            <div className="L-Reporte">
                <div className="valor">
                <p>Bs</p>
                <p >200</p>
                </div>
                <p style={{ fontWeight: 'bold' }}>Valor en ganancia</p>
            </div>
            <div className="L-Reporte">
            
                <p>1</p>
                <div className="valor">
                <div className="cuadradito-naranja"></div>
                <p style={{ fontWeight: 'bold' }}>Stock bajo</p>
                </div>
            </div>
            <div className="L-Reporte">
                <p >12</p>
                <div className="valor">
                <div className="cuadradito-rojo"></div>
                <p style={{ fontWeight: 'bold' }}>Sin stock</p>
                </div>
            </div>
            <div className="L-Reporte">
                <p>1200</p>
                <div className="valor">
                <div className="cuadradito-azul"></div>
                <p style={{ fontWeight: 'bold' }}>Stock Actual</p>
                </div>
            </div>
            </div>

            <div className='charts'>
                <div className='graficas1'>
                    {/* GRAFICA EN BARRA DE LOS 5 PRODUCTOS DE  ENTRADAS Y SALIDAS */}
                <div className='grafica-barra'>
                    <p className='Letra-Reporte'>5 Productos top de entrada y salida</p>
                <ResponsiveContainer width="100%" height={200}>
                
                    <BarChart data={reporteBarra} margin={{ top: 5, right: 10, left: -8, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="entrada" fill="#0000FE" />
                        <Bar dataKey="salida" fill="#97CDFC" />
                    </BarChart>
                </ResponsiveContainer> 
                </div>
                
                {/* GRAFICA EN TORTA DEL NIVEL DE INVENTARIO */}
                <div className='grafica-torta'>
                    <p className='Letra-Reporte'>Nidel de inventario</p>
                <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                    <Pie
                        data={nInventario}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        innerRadius={20}
                        fill="white"
                    >
                        {nInventario.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Leyenda */}
                <div className='leyenda'>
                    {nInventario.map((entry, index) => (
                    <div key={`leyenda-${index}`} className='item-leyenda'>
                        <div className='color-cuadrado' style={{ backgroundColor: COLORS[index] }}></div>
                        <p>{entry.name}</p>
                    </div>
                    ))}
                </div>
                </div>
                        </div>
                <div className='graficas2'>
                    {/* GRAFICA DE DOS LINEAS DE LA ENTRADA Y SALIDA */}
                <div className='grafica-linea2'>
                <p>Total de entradas VS total de salidas</p>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={reporteGraficas} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Entrada" stroke="#0000FE" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="salida" stroke="#97CDFC" />
                </LineChart>
                </ResponsiveContainer>
                </div>
                <div className='grafica-Indicador'>
                    <p>Indicador de productos sin stock</p>
                    {/* INDICADOR DE STOCK */}
                <PieChart width={400} height={200} className='indicador'>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={indicadorStock}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        fill="#8884d8"
                        stroke="none"
                    >
                        {indicadorStock.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    {needle(value, indicadorStock, cx, cy, iR, oR, '#d0d000')}
                </PieChart>
                </div>
                <div className='grafica-linea1'>
                    {/* GRAFICA EN LINEA SOLO UNO */}
                    <p>Total de stock mensual</p>
                <ResponsiveContainer width="100%" height={180}>
                    <AreaChart
                        width={500}
                        height={200}
                        data={uStock}
                        syncId="anyId"
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Stock" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
                </ResponsiveContainer>
                </div>
                </div>
        </div>
    </div>
);
}

export default Reportes;
