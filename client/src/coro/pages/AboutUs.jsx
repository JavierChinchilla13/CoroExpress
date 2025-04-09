import { AuthContext } from "../../auth/context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../../assets/logo.png";
import AuthLink from "../components/shared/AuthLink";
import ComoFunciona from "../components/shared/ComoFunciona";
import DeseaCasillero from "../components/shared/DeseaCasillero";
import ContactCard from "../components/shared/ContactSection";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen pt-[150px]">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Logo y título */}
        <div className="flex flex-col items-center justify-between mb-10">
          <div className="flex flex-col items-center mb-4">
            <img src={logo} alt="TCU" className="h-24 md:h-28 mb-4 mx-auto" />
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Coro Express
            </h1>
          </div>
        </div>
        <DeseaCasillero></DeseaCasillero>

        <ComoFunciona />
        <ContactCard></ContactCard>
      </main>
      {/* Footer */}
      <Footer />
      {/* Componente de AuthLink */}
      <AuthLink />
    </div>
  );
};

export default AboutUs;
