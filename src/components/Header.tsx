import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <img 
            src="/ML_logo.svg" 
            alt="Mercer & Loom Logo" 
            className={`w-10 h-10 transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'filter-none' : 'brightness-0 invert'
            }`}
          />
          <span className={`text-lg md:text-xl uppercase tracking-wider font-medium transition-colors duration-300 ${
            isScrolled ? 'text-black' : 'text-white'
          }`}>
            Mercer &amp; Loom
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {['Philosophy', 'Services', 'About', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className={`relative transition-colors duration-300 hover:text-accent ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            isScrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`w-full h-0.5 bg-current transition-all duration-300 transform ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
            }`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 mt-1 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 mt-1 transform ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
            }`} />
          </div>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 md:hidden">
            <nav className="container mx-auto py-4 px-6 flex flex-col space-y-4">
              {['Philosophy', 'Services', 'About', 'Contact'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-black hover:text-accent transition-colors duration-300 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
