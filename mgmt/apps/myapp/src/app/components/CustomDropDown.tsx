import { useState } from 'react';

interface CustomDropdownProps {
  selected: string;
  setSelected: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ['Dessert', 'Chinese', 'Italian', 'Vegetarian', 'Beverages', 'Other'];

  return (
    <div className="relative inline-block w-full text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-left">{selected || 'Select a category'}</span>
          <svg
            className={`h-5 w-5 text-gray-400 transform ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {categories.map((category) => (
              <a
                key={category}
                href="#"
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer"
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  setSelected(category);
                  setIsOpen(false);
                }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
