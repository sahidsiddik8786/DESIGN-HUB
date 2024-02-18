import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const MyChartComponent = () => {
    const scatterData = [
        { x: 100, y: 200 },
        { x: 200, y: 150 },
        { x: 300, y: 400 },
        { x: 400, y: 300 },
        { x: 500, y: 200 },
    ];

    const pieData = [
        { name: 'A', value: 400 },
        { name: 'B', value: 300 },
        { name: 'C', value: 300 },
        { name: 'D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <main className='main-container'>
            {/* Scatter Chart */}
            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="x" />
                        <YAxis type="number" dataKey="y" name="y" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="A Scatter" data={scatterData} fill="#8884d8" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default MyChartComponent;
