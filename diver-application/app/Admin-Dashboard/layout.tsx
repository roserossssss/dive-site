import  Sidebar from "../ui/admin-dashboard/sidebar/sidebar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
         <div className="flex min-h-screen bg-[#001526]">
            <div className=" fixed h-full z-50">
                <Sidebar />
            </div>
        
            <div className="flex-1 p-5 md:ml-72 ml-0 bg-[#001526] ">
                {children}
            </div>
        </div>
    ) };