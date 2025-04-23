import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Logo from "../components/shared/Logo";
import { AuthContext } from "../../auth/context/AuthContext";

const Header = () => {
  const { authState } = useContext(AuthContext);
  console.log("AUTH STATE in Header/AdminList:", authState);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Estilos comunes para los botones del menú
  const linkStyle =
    "p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer";

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-[#FFFFFF] shadow-lg flex justify-between items-center text-black py-4 px-8 md:px-11"
      style={{ height: "150px" }}
    >
      {/* Menú principal (escritorio) */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link
          to="/about#herramientas-servicio"
          onClick={() => setMenuOpen(false)}
        >
          <li className={linkStyle}>Herramientas de servicio</li>
        </Link>

        <Link
          to="/about#solicitar-casillero"
          onClick={() => setMenuOpen(false)}
        >
          <li className={linkStyle}>Solicitar casillero</li>
        </Link>

        <Link to="/about#como-funciona" onClick={() => setMenuOpen(false)}>
          <li className={linkStyle}>¿Cómo funciona?</li>
        </Link>

        <Link to="/about#contacto" onClick={() => setMenuOpen(false)}>
          <li className={linkStyle}>Contacto</li>
        </Link>

        {authState?.logged && (
          <>
            <NavLink to="/admin/casilleros" onClick={() => setMenuOpen(false)}>
              <li className={linkStyle}>Casilleros</li>
            </NavLink>
            <NavLink to="/admin/pedidos" onClick={() => setMenuOpen(false)}>
              <li className={linkStyle}>Pedidos</li>
            </NavLink>
            <NavLink to="/admin/addUser" onClick={() => setMenuOpen(false)}>
              <li className={linkStyle}>Colaboradores</li>
            </NavLink>
          </>
        )}
      </ul>

      {/* Icono del menú móvil */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed top-[150px] left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg z-[1000] border-b-2 border-gray-300 shadow-lg"
        >
          <Link
            to="/about#herramientas-servicio"
            onClick={() => setMenuOpen(false)}
          >
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              Herramientas de servicio
            </li>
          </Link>
          <Link
            to="/about#solicitar-casillero"
            onClick={() => setMenuOpen(false)}
          >
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              Solicitar casillero
            </li>
          </Link>
          <Link to="/about#como-funciona" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              ¿Cómo funciona?
            </li>
          </Link>
          <Link to="/about#contacto" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              Contacto
            </li>
          </Link>

          {authState?.logged && (
            <>
              <NavLink
                to="/admin/casilleros"
                onClick={() => setMenuOpen(false)}
              >
                <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
                  Casilleros
                </li>
              </NavLink>
              <NavLink to="/admin/pedidos" onClick={() => setMenuOpen(false)}>
                <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
                  Pedidos
                </li>
              </NavLink>
              <NavLink to="/admin/addUser" onClick={() => setMenuOpen(false)}>
                <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
                  Colaboradores
                </li>
              </NavLink>
            </>
          )}
        </div>
      )}

      {/* Logo */}
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <Logo extraStyle="cursor-pointer hover:scale-105 transition-all w-[180px]" />
      </Link>
    </header>
  );
};

export default Header;
