import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart"

export default function dashboard() {
    return (

        <div className={styles.wrapper}>
           <div className={styles.main}>
            <div className={styles.cards}>
            <Card />
            <Card />
            <Card />
            </div>
            <Chart />
        </div>
        
        </div> 


    )};