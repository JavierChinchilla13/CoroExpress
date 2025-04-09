import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminForm from "../components/shared/AdminForm";
import AdminTable from "../components/shared/AdminTable";
import AuthLink from "../components/shared/AuthLink";
import { useState } from "react";

const AddUser = () => {
  const [refreshTable, setRefreshTable] = useState(false);

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen pt-[150px]">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center gap-8 p-8 bg-gray-50 flex-grow container mx-auto px-6 py-12">
        {/* <div className="flex-grow container mx-auto px-6 py-12"> */}
        <AdminForm setRefreshTable={setRefreshTable} />
        <AdminTable refreshTrigger={refreshTable} />
      </div>
      <Footer />
      {/* Componente de AuthLink */}
      <AuthLink />
    </div>
  );
};

export default AddUser;
