import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthLink from "../components/shared/AuthLink";
// import ComoFunciona from "../components/shared/ComoFunciona";
import DeseaCasillero from "../components/shared/DeseaCasillero";
import ContactCard from "../components/shared/ContactSection";
import Stores from "../components/shared/Stores";
import Herramientas from "../components/shared/Herramientas";
import InicioP from "../components/shared/InicioP";

const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // delay pequeño por si el contenido aún no está renderizado
      }
    }
  }, [location]);
  return (
    <div className=" flex flex-col min-h-screen pt-[150px]">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Logo y título */}
        <InicioP />
        <section id="herramientas-servicio">{<Herramientas />}</section>
        <Stores />
        <section id="solicitar-casillero">{<DeseaCasillero />}</section>
        {/* <section id="como-funciona"> {<ComoFunciona />}</section> */}
        <section id="contacto"> {<ContactCard />}</section>
      </main>
      {/* Footer */}
      <Footer />
      {/* Componente de AuthLink */}
      <AuthLink />
    </div>
  );
};

export default AboutUs;
