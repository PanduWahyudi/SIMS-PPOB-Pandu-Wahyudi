// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import RegistrationPage from "./pages/registration";
import ServicePage from "./pages/service";
import TopUpPage from "./pages/topup";
import TransactionPage from "./pages/transaction";
import AccountPage from "./pages/akun";
import NotFoundPage from "./pages/notfound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/beranda" element={<HomePage />} />
        <Route path="/registrasi" element={<RegistrationPage />} />
        <Route path="/layanan" element={<ServicePage />} />
        <Route path="/top-up" element={<TopUpPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/akun" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
