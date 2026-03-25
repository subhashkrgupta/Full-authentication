import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4">
      
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          MyApp
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="text-gray-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>

        </div>
      )}
    </header>
  );
};

export default Navbar;