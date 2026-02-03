import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[60px] md:h-[75px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-[32px] md:h-[44px] w-auto object-contain"
              />
            </div>

            {/* ...existing navigation items... */}

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 md:px-5 md:py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            {/* ...existing form fields... */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
