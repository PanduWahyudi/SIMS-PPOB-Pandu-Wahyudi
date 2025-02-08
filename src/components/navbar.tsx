import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/top-up", label: "Top Up" },
    { path: "/transaction", label: "Transaction" },
    { path: "/akun", label: "Akun" },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/beranda">
            <div className="flex items-center space-x-2">
              <img src="/images/Logo.png" alt="logo" className="w-4" />
              <h1 className="font-medium text-sm uppercase">SIMS PPOB</h1>
            </div>
          </Link>

          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium  ${
                  location.pathname === item.path ? "text-danger" : "text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
