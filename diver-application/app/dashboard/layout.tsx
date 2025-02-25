import  Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";
import Styles from "../ui/dashboard/dashboard.module.css"

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className={Styles.container}>
            <div className={Styles.menu}>
            <Sidebar />
            </div>
            <div className={Styles.content}>
              <Navbar />
              {children}
            </div>
        </div>
    )};