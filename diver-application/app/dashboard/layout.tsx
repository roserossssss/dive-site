import  Sidebar from "../ui/dashboard/sidebar/sidebar";
import Styles from "../ui/dashboard/dashboard.module.css"

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex min-h-screen">
    <div className=" fixed h-full z-50">
        <Sidebar />
    </div>

    <div className="flex-1 p-4 md:ml-72 ml-0">
        {children}
    </div>
</div>
    )};