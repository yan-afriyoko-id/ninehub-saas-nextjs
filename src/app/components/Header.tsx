'use client';

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 
          className="text-xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => scrollToSection('home')}
        >
          Analytics Pro
        </h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Features
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Pricing
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                FAQ
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-blue-400 transition-colors">Login</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Sign Up</button>
        </div>
      </div>
    </header>
  );
}