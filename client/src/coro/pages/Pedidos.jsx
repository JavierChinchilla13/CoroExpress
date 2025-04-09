import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthLink from "../components/shared/AuthLink";
import PedidoTable from "../components/shared/PedidoTable";
import { useState } from "react";

const Casillero = () => {
  const [refreshTable] = useState(false);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen pt-[150px]">
      <Header />
      <div className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Pedidos</h1>
        <PedidoTable refreshTrigger={refreshTable} />
      </div>

      <Footer />
      {/* Componente de AuthLink */}
      <AuthLink />
    </div>
  );
};

export default Casillero;
