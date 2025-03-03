import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart"

export default function dashboard() {
    return (

        <div className={styles.wrapper}>
           <div className={styles.main}>

            <div className="grid grid-cols-2 gap-2 ">
                <div className="row-span-1 ">
                <Card />
                </div>
            <div>
            <Chart />
            </div>
            
            </div>

            <div className="bg-white text-black shadow-2xl shadow-black grid grid-cols-2">
           <Card />
           <Card />
            </div>
        </div>
        
        </div> 

    )};