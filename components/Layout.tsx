
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tool', path: '/tool' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
              <FileText className="w-8 h-8" />
              <span>Img2PDF</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'
                } px-1 py-4 text-sm font-medium transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-4">
              <FileText className="w-6 h-6" />
              <span>Img2PDF</span>
            </Link>
            <p className="text-gray-500 text-sm">
              The fastest, most secure client-side image to PDF converter tool on the web.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-500 hover:text-blue-600 text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-blue-600 text-sm">Contact Us</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-blue-600 text-sm">Blog</Link></li>
              <li><Link to="/tool" className="text-gray-500 hover:text-blue-600 text-sm">PDF Tool</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-500 hover:text-blue-600 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-blue-600 text-sm">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="text-gray-500 hover:text-blue-600 text-sm">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-700 cursor-pointer" />
              <Mail className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
            <p className="text-gray-500 text-xs">zansarizaid08@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Img2PDF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
