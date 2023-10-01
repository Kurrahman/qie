'use client';

import {
    Chart, 
    ArcElement,
    CategoryScale,
} from 'chart.js';
import styles from './donut.module.css'
import Data from './donut.json' 
import { Doughnut } from 'react-chartjs-2';

Chart.register(
    CategoryScale,
    ArcElement
)

export default function Donutchart(){
    let {data, colors} = (() => {
        let data = []
        let colors = []
        Data.data.forEach(element => {
            data.push(element.value)
            colors.push(element.color)
        });
        return {data, colors};
    })();

    const cfg = {
        data: {
            labels: [
                "Legend 1",
                "Legend 2",
                "Legend 3",
                "Legend 4",
            ],
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                donut_total_data: {
                    data: data
                }
            }
        }
    }

    const totalData = {
        id: 'donut_total_data',
        beforeDraw: (chart, args, options) => {
            let total = 0
            options.data.forEach(data => {
                total += parseInt(data)
            })
            const {ctx} = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.font = '600 17px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('Total', chart.width/2, chart.height/2 - 5)
            ctx.font = '700 18px Arial'
            ctx.fillText(total, chart.width/2, chart.height/2 + 15)
            ctx.restore();
        },
        defaults:{
            data: ['0']
        }
    }

    return (
        <div className={styles.donutContainer}>
            <div className={styles.title}>Card Title</div>
            <div className={styles.donutChart}>
                <Doughnut
                    data={cfg.data}
                    plugins={[totalData]}
                    options={cfg.options}
                />
            </div>
            <div className={styles.legendContainer}>
                {
                    cfg.data.labels.map(function(object, i){
                        return(
                            <div className={styles.legend} key={i}>
                                <span className={styles.dot} style={{backgroundColor: colors[i]}}></span>
                                {object}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}