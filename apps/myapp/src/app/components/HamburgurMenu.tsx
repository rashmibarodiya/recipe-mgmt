import { useState } from 'react';


interface HamburgerMenuProps {
  onToggle: (isOpen: boolean) => void; 
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({onToggle}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <div
        className={`flex flex-col justify-between w-8 h-6 cursor-pointer ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span className={`block h-1 bg-gray-900 dark:bg-gray-900 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block h-1 bg-red-500 dark:bg-gray-900 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-1 bg-red-500 dark:bg-gray-900 transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </div>

      {/* Overlay for closing the drawer by clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar (Top Right Drawer) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-red-300 shadow-lg text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button 
          className="text-white absolute top-4 right-4 focus:outline-none"
          onClick={toggleMenu}
        >
          &#10005;
        </button>

        <ul className="p-4 space-y-4 mt-12">
          <li className="hover:text-indigo-900 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">About</li>
          <li className="hover:text-yellow-400 cursor-pointer">Signin</li>
          <li className="hover:text-yellow-400 cursor-pointer">Explore</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
