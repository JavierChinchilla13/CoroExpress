import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../components/shared/Logo";
import { AuthContext } from "../../auth/context/AuthContext";

const Header = () => {
  const { authState } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-[#FFFFFF] shadow-lg flex justify-between items-center text-black py-4 px-8 md:px-11"
      style={{ height: "150px" }}
    >
      {/* Menú principal (versión escritorio) */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <NavLink to="/personal" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
            Herramientas de servicio
          </li>
        </NavLink>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
            Solicitar casillero
          </li>
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
            ¿Cómo funciona?
          </li>
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
            Contacto
          </li>
        </NavLink>
        {authState?.logged && (
          <>
            <NavLink to="/admin/casilleros" onClick={() => setMenuOpen(false)}>
              <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
                Casilleros
              </li>
            </NavLink>
            <NavLink to="/admin/pedidos" onClick={() => setMenuOpen(false)}>
              <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
                Pedidos
              </li>
            </NavLink>
            <NavLink to="/admin/addUser" onClick={() => setMenuOpen(false)}>
              <li className="p-3 text-base hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
                Colaboradores
              </li>
            </NavLink>
          </>
        )}
      </ul>

      {/* Icono del menú móvil */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => {
          setMenuOpen(!menuOpen);
          console.log("Estado de menuOpen:", menuOpen);
        }}
      ></i>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          className={`fixed top-[150px] left-0 w-full bg-white flex flex-col 
          items-center gap-6 font-semibold text-lg z-[1000] border-b-2 border-gray-300 shadow-lg`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <NavLink to="/personal" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              Herramientas de servicio
            </li>
          </NavLink>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              Solicitar casillero
            </li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              ¿Cómo funciona?
            </li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-[#46B2D5] hover:text-white rounded-md transition-all cursor-pointer">
              Contacto
            </li>
          </NavLink>
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
