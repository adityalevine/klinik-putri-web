import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed w-full top-0 left-0 border-b bg-white px-8">
      <div className="container mx-auto flex justify-between items-center h-16 md:justify-around">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold">
          Klinik Putri
        </Link>

        {/* Navigation (Hidden on Mobile) */}
        <nav className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
          <Link to="/" className="text-gray-500 font-medium hover:text-black py-2 md:py-0" onClick={toggleMenu}>
            Beranda
          </Link>
          <Link to="/jadwal-dokter" className="text-gray-500 font-medium hover:text-black py-2 md:py-0" onClick={toggleMenu}>
            Jadwal Dokter
          </Link>
          <Link to="/hubungi" className="text-gray-500 font-medium hover:text-black py-2 md:py-0" onClick={toggleMenu}>
            Hubungi
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login">
            <Button variant="outline">Masuk</Button>
          </Link>
          <Link to="/register">
            <Button>Daftar</Button>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button className="md:hidden text-2xl text-gray-500 focus:outline-none" onClick={toggleMenu} aria-label={menuOpen ? "Close Menu" : "Open Menu"}>
          {menuOpen ? <IoCloseOutline className="w-10 h-10" /> : <IoMenu className="w-10 h-10" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 p-4">
            <Link to="/" className="text-gray-500 font-medium hover:text-black" onClick={toggleMenu}>
              Beranda
            </Link>
            <Link to="/jadwal-dokter" className="text-gray-500 font-medium hover:text-black" onClick={toggleMenu}>
              Jadwal Dokter
            </Link>
            <Link to="/hubungi" className="text-gray-500 font-medium hover:text-black" onClick={toggleMenu}>
              Hubungi
            </Link>
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full">
                Masuk
              </Button>
            </Link>
            <Link to="/register" onClick={toggleMenu}>
              <Button>Daftar</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
