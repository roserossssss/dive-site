import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Chart from "../ui/dashboard/chart/chart"

export default function dashboard() {
    return (

        <div className={styles.wrapper}>
        <div className={styles.main}>

          <div className="flex flex-col md:flex-row gap-3">

            <div className="w-full md:flex-1">
              <Card />
            </div>
      

            <div className="w-full md:flex-1">
              <Chart />
            </div>
          </div>

          <div className="bg-white text-black shadow-2xl shadow-black grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card />
            <Card />
          </div>
        </div>
      </div>
      

    )};