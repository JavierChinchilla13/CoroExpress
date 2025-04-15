import React from "react";
import MailIcon from "../../../assets/mail.png";
import WhatsAppIcon from "../../../assets/whatsapp.png";
import InstagramIcon from "../../../assets/instagram.png";
import Logo from "../../../assets/logo.png";

const ContactoSection = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        {/* Sección izquierda - Contacto con iconos */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contacto</h2>

          <div className="flex justify-center gap-6">
            {/* WhatsApp */}
            <div className="flex flex-col items-center space-y-2">
              <a
                href="https://wa.me/50660372940"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:bg-green-100 transition"
              >
                <img src={WhatsAppIcon} alt="WhatsApp" className="w-12 h-12" />
              </a>
              <span className="text-xs font-medium text-gray-600">
                WhatsApp
              </span>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center space-y-2">
              <a
                href="https://www.instagram.com/coro.express/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:opacity-80 transition bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
              >
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  className="w-12 h-12"
                />
              </a>
              <span className="text-xs font-medium text-gray-600">
                Instagram
              </span>
            </div>
          </div>
        </div>

        {/* Separador (solo en versión desktop) */}
        <div className="hidden md:block h-14 w-px  mx-48"></div>

        {/* Sección derecha - Logo */}
        <div className="flex items-center mt-4 md:mt-0">
          <img src={Logo} alt="CORO EXPRESS" className="h-20 md:h-24" />
        </div>
      </div>
    </div>
  );
};

export default ContactoSection;
