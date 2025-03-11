import Reports from "../ui/dashboard/reports/reports";
import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css";
import Chart from "../ui/dashboard/chart/chart";

export default function Dashboard() {
    return (
        <div className={styles.wrapper}>
            <div className="grid grid-cols-3 gap-2 items-start">
                <Card title={"Hello"} value={"Yes"} />
                <Card title={"Hello"} value={"Yes"} />
                <Card title={"Hello"} value={"Yes"} />
            </div>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-4 items-start gap-2">
                    {/* Left side*/}        
                    <div className="lg:w-[800px] mb-2">
                        <Chart />
                    </div>
                    {/* Right side flex-1 h-auto min-w-0*/}
                    <div className=" w-auto ">
                        <Reports />
                    </div>
                </div>

        </div>
    );
}
