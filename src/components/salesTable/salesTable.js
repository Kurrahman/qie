import styles from './salesTable.module.css'

import Image from 'next/image'
import SalesData from './sales.json'
import CategoryMap from './category.json'

const tableDivider =  "1px solid #DFE2E1"

export default function SalesTable(){
    let data = SalesData.data
    
    function getCategory(id){
        let cat
        CategoryMap.categories.forEach(element => {
            if (element.id === id){
                cat = element
            }
        });
        return (
            <div 
                className={styles.category} 
                style={{
                    backgroundColor: cat.backgroundColor,
                    color: cat.textColor
                }}>
                {cat.name}
            </div>
        )
    }

    function currencyFormat(num) {
        return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className={styles.container}>
            <table className={styles.salesTable}>
                <thead>
                    <tr>
                        <th className={styles.tableHead} style={{paddingLeft: "30px"}}>Products Name</th>
                        <th className={styles.tableHead}>Category</th>
                        <th className={styles.tableHead}>Amount</th>
                        <th className={styles.tableHead}>Items Sold</th>
                        <th className={styles.tableHead}>Price</th>
                        <th className={styles.tableHead}>Sales</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {
                        data.map(function(row, i){
                            return (
                                <tr key={i} style={{borderBottom: tableDivider}}>
                                    <td>
                                        <div className={styles.productName}>
                                            <Image
                                                src={row.img}
                                                width={30}
                                                height={30}
                                            />
                                            {row.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {getCategory(row.category)}
                                        </div>
                                    </td>
                                    <td>
                                        {row.stock} in stock
                                    </td>
                                    <td>
                                        {row.sold}
                                    </td>
                                    <td>
                                        {currencyFormat(row.price)}
                                    </td>
                                    <td>
                                        {currencyFormat(row.price * row.sold)}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}