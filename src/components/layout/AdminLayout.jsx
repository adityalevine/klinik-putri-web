import { IoMenu, IoPersonOutline, IoLogOutOutline, IoMedkitOutline, IoHomeOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { ChevronRight, LucideCalendarClock, LucideLayoutDashboard, LucideStethoscope } from "lucide-react";

const SidebarItem = ({ children, path, isActive, onClick }) => (
  <Link to={path}>
    <Button variant="ghost" size="lg" className={`w-full rounded-none justify-start border-r ${isActive ? "text-black bg-gray-100 border-r" : ""}`} onClick={onClick}>
      {children}
    </Button>
  </Link>
);

export const AdminLayout = ({ title, rightSection, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State to toggle visibility of sub-menu
  const [isDoctorScheduleOpen, setIsDoctorScheduleOpen] = useState(false);

  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleHome = async () => {
    try {
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("current-user");

    dispatch({
      type: "USER_LOGOUT",
    });

    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-[#159030] transition-transform duration-300 min-h-screen text-white
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-72`}
      >
        <div className="h-16 p-8 flex items-center justify-start border-b bg-white">
          <img src="/logo.svg" alt="Logo" width={50} />
        </div>

        <div className="flex flex-col space-y-0 py-4">
          <h2 className="ms-8 my-5 text-xl font-semibold">Menu</h2>
          <SidebarItem path="/admin/dashboard" isActive={location.pathname.startsWith("/admin/dashboard")} onClick={() => handleNavigation("/admin/dashboard")}>
            <LucideLayoutDashboard className="h-6 w-6 mr-4" />
            Dashboard
          </SidebarItem>

          <SidebarItem path="/admin/specialization" isActive={location.pathname === "/admin/specialization"} onClick={() => handleNavigation("/admin/specialization")}>
            <IoMedkitOutline className="h-6 w-6 mr-4" />
            Spesialisasi
          </SidebarItem>

          <SidebarItem>
            <LucideStethoscope className="h-6 w-6 mr-4" />
            Daftar Dokter
          </SidebarItem>

          <SidebarItem onClick={() => setIsDoctorScheduleOpen(!isDoctorScheduleOpen)}>
            <div className="flex items-center">
              <LucideCalendarClock className="h-6 w-6 mr-4" />
              Jadwal Dokter
            </div>
            {/* Chevron Right Icon with Rotation on Open */}
            <ChevronRight className={`h-5 w-5 transition-transform mx-20 ${isDoctorScheduleOpen ? "rotate-90" : ""}`} />
          </SidebarItem>

          {/* Conditional rendering of sub-menu */}
          {isDoctorScheduleOpen && (
            <div className="ml-8 space-y-2">
              <SidebarItem onClick={() => handleNavigation("/admin/specialization/doctors/specialist")}>Dokter Spesialis</SidebarItem>
              <SidebarItem onClick={() => handleNavigation("/admin/specialization/doctors/general")}>Dokter Umum</SidebarItem>
            </div>
          )}

          <SidebarItem>
            <IoPersonOutline className="h-6 w-6 mr-4" />
            Reservasi
          </SidebarItem>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 border-b w-full flex items-center px-4">
          {/* Hamburger Menu */}
          <Button onClick={toggleSidebar} className="lg:hidden" variant="ghost" size="icon">
            <IoMenu className="h-6 w-6" />
          </Button>

          {/* Avatar with dropdown menu */}
          <div className="flex items-center gap-2 lg:ml-auto absolute top-2 right-4 md:absolute md:top-2 md:right-4 sm:relative sm:top-0 sm:right-0">
            <p className="text-sm sm:block">{userSelector.username}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={userSelector.profile_url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" className="w-48 mt-2">
                <DropdownMenuLabel />
                <DropdownMenuItem onClick={handleHome}>
                  <IoHomeOutline />
                  Website Utama
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <IoLogOutOutline className="text-red-500" />
                  <span className="text-red-500">Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex flex-col p-4 bg-gray-100 min-h-screen">
          <div className="flex justify-between items-start pb-4 border-b mb-8 flex-col sm:flex-row">
            <div>
              <h1 className="font-bold text-4xl text-[#159030]">{title}</h1>
            </div>

            {rightSection}
          </div>

          {children}
        </main>
      </div>

      {/* Overlay (Small screens) */}
      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"></div>}
    </div>
  );
};
