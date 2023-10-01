'use client';
import styles from './bar.module.css'
import {
    Chart, 
    CategoryScale, 
    LinearScale,
    BarElement,
} from 'chart.js';
import Data from './bar.json' 
import { Bar } from 'react-chartjs-2';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const barWidth = 22;

export default function Barchart(){

    let data1 = (() => {
        let data = []
        Data.data.forEach(element => {
            data.push(element.value1)
        });
        return data;
    })();

    let data2 = (() => {
        let data = []
        Data.data.forEach(element => {
            data.push(element.value2)
        });
        return data;
    })();

    const cfg = {
        data: {
            labels: [
                "22 May",
                "23 May",
                "24 May",
                "25 May",
                "26 May",
                "27 May",
                "28 May",
            ],
            datasets: [
                {
                    label: "Legend 1",
                    backgroundColor: "#198564",
                    data: data1,
                    maxBarThickness: barWidth,
                },
                {
                    label: "Legend 2",
                    backgroundColor: "#F9D14B",
                    data: data2,
                    maxBarThickness: barWidth,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                text: 'Card Title'
            },
            indexAxis: 'y',
            legend: {
                position: 'top',
                align: 'end'
            }
        }
    }
    return (
        <div className={styles.barChartContainer}>
            <div className={styles.title}>Card Title</div>
            <div className={styles.legendContainer}>
                {
                    cfg.data.datasets.map(function(object, i){
                        return (
                            <div className={styles.legend} key={object.label}>
                                <span className={styles.dot} style={{backgroundColor: object.backgroundColor}}></span>
                                {object.label}
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.barChart}>
                <Bar
                    data={cfg.data}
                    options={cfg.options}
                />
            </div>
        </div>
    );
}