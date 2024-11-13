import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const LightweightChart = ({ data }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

        const lineSeries = chart.addLineSeries();
        lineSeries.setData(data);

        return () => {
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} style={{ width: '1000px', height: '400px' }} />;
};

export default LightweightChart;