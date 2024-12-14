import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed w-full top-0 left-0 border-b bg-white px-5 z-10">
      <div className="container mx-auto flex justify-between items-center h-20 md:justify-around">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width={70} />
        </Link>

        {/* Navigation (Hidden on Mobile) */}
        <nav className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center md:space-x-6 absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
          <Link to="/" className={`${isActive("/") ? "text-[#159030]" : "text-gray-500"} font-medium hover:text-[#159030] py-2 md:py-0`} onClick={toggleMenu}>
            Beranda
          </Link>
          <Link to="/schedule" className={`${isActive("/schedule") ? "text-[#159030]" : "text-gray-500"} font-medium hover:text-[#159030] py-2 md:py-0`} onClick={toggleMenu}>
            Jadwal Dokter
          </Link>
          <Link to="/contact" className={`${isActive("/contact") ? "text-[#159030]" : "text-gray-500"} font-medium hover:text-[#159030] py-2 md:py-0`} onClick={toggleMenu}>
            Hubungi
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login">
            <Button variant="outline" className="w-28 text-[#159030] hover:text-[#159030] border-[#159030]">
              Masuk
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-28 bg-[#159030] hover:bg-green-700">Registrasi</Button>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button className="md:hidden text-2xl text-gray-500 focus:outline-none" onClick={toggleMenu} aria-label={menuOpen ? "Close Menu" : "Open Menu"}>
          {menuOpen ? <IoCloseOutline className="w-10 h-10" /> : <IoMenu className="w-10 h-10" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 p-4">
            <Link to="/" className={`${isActive("/") ? "text-[#159030]" : "text-gray-500"} font-medium hover:text-[#159030]`} onClick={toggleMenu}>
              Beranda
            </Link>
            <Link to="/schedule" className={`${isActive("/schedule") ? "text-[#159030]" : "text-gray-500"} font-medium hover:text-[#159030]`} onClick={toggleMenu}>
              Jadwal Dokter
            </Link>
            <Link to="/contact" className={`${isActive("/contact") ? "text-[#159030]" : "text-gray-500"} font-medium hover:text-[#159030]`} onClick={toggleMenu}>
              Hubungi
            </Link>
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full text-[#159030] hover:text-[#159030] border-[#159030]">
                Masuk
              </Button>
            </Link>
            <Link to="/register" onClick={toggleMenu}>
              <Button className="w-full bg-[#159030] hover:bg-green-700">Registrasi</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
