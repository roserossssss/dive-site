import  Sidebar from "../ui/admin-dashboard/sidebar/sidebar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
         <div className="flex min-h-screen">
            <div className=" fixed h-full w-auto z-50 ">
                <Sidebar />
            </div>
        
            <div className="flex-1 p-8 md:ml-72 ml-0 bg-[#001526] ">
                {children}
            </div>
        </div>
    ) };