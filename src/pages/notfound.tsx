import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center mt-12">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">Maaf Halaman Tidak Ditemukan</p>
      <Link to="/" className="mt-6 inline-block text-blue-500 hover:underline">
        Silahkan login kembali
      </Link>
    </div>
  );
};

export default NotFoundPage;
