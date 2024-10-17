import { useState } from 'react';

import { useRouter } from "next/navigation"
import { signOut, useSession } from 'next-auth/react';
interface HamburgerMenuProps {
  onToggle: (isOpen: boolean) => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession()
  const router = useRouter();
  
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
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar (Top Right Drawer) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-stone-400  shadow-lg text-black transition-transform transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full  '
          }`}
      >
        {/* Close Button */}
        <button
          className="text-black absolute top-4 right-4 focus:outline-none"
          onClick={toggleMenu}
        >
          &#10005;
        </button>
        <div className='flex text-xl text-bold justify-center mt-8 text-gray-900'>
        {session?.data ? `${session?.data?.user?.name}` : "RecipeWorld"}
           </div>
        <ul className="p-4 space-y-2 mt-8">
          <button className="hover:text-green-900 rounded-md px-2 w-full flex justify-left border-gray-500 shadow-lg
           text-gray-700 cursor-pointer"
            onClick={() => {
              router.push("/")
            }}
          >Home
        
          </button>
          
          <button className="hover:text-green-900 w-full rounded-md px-2 flex justify-left border-gray-500 shadow-lg text-gray-700 cursor-pointer"
            onClick={() => {
              router.push("/explore")
            }}
           
          >Explore
           <div className="border-b border-gray-500" /> 
          </button>
          
          {!session?.data ? (

           
            <button className="hover:text-green-900 w-full rounded-md px-2  flex justify-left border-gray-500 shadow-lg text-gray-700 cursor-pointer"
              onClick={() => {
                router.push("/auth/signin")
              }}
            >Signin
            
            </button>
            
            
            
          ) : (
            <>
              <button className="hover:text-green-900 rounded-md w-full px-2 flex  justify-left border-gray-500 shadow-lg text-gray-700 cursor-pointer"
                onClick={() => {
                  router.push("/admin/addRecipe")
                }}
              >Add Recipes
              <div className="border-b border-gray-500" /> 
              </button>
              <button className="hover:text-green-900 rounded-md px-2 w-full flex justify-left border-gray-500 shadow-lg 
              text-gray-700 cursor-pointer"
                onClick={() => {
                  router.push("/admin/getUserRecipe")
                }}
              >My Recipes</button>

              <button className="hover:text-red-700 rounded-md px-2 w-full  flex justify-left border-gray-500 shadow-lg 
              text-red-900 cursor-pointer"
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                }}
              >Logout</button>

            </>
          )}


        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
