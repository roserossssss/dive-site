import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart"

export default function dashboard() {
    return (

        <div className={styles.wrapper}>
           <div className={styles.main}>

            <div className="grid grid-cols-2">
            <Card />
            <Card />
            </div>

            <div className="bg-white text-black shadow-2xl shadow-black">
            <Chart />
            </div>
        </div>
        
        </div> 


    )};