import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart"

export default function dashboard() {
    return (

        <div className={styles.wrapper}>
           <div className={styles.main}>
            <div className={styles.cards}>
            <Card />
            </div>
            <div className="bg-white p-4 text-black text-xl shadow-2xl shadow-black">
            <Chart />
            </div>
        </div>
        
        </div> 


    )};