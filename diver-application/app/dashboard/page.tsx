import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import Chart from "../ui/dashboard/chart/chart";

export default function Dashboard() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-4 items-start">
                    {/* Card with fixed width */}
                    <div className="lg:w-72 w-auto">
                        <Card />
                    </div>
                    {/* Chart takes remaining space */}
                    <div className="w-full flex-1 h-auto min-w-0">
                        <Chart />
                        <Chart />
                    </div>
                </div>
            </div>
        </div>
    );
}
