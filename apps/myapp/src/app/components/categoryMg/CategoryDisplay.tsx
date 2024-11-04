
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CategoryProps {
  url: string;
  category: string;
}

export  function CategoryDisplay({ url, category }: CategoryProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true); 
    router.push(`/getByCategory/${category}`);
  };

  return (

    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
        <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
              border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"></div>
        </div>
      ) : (
 
    <div
       className="w-80 md:w-80 mx-auto bg-violet-200 opacity-100 rounded-lg shadow-lg 
       overflow-hidden md:max-w-3xl p-8 space-y-4 transform transition-transform 
       hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <Image
          src={url}
          width={300}
          height={200}
          alt={category}
          className="w-64 h-64 opacity-100 object-cover rounded-t-lg"
        />
      </div>
      <div>
        <h3 className="text-3xl font-semibold text-gray-800">{category}</h3>
      </div>
    </div>
    )}
       </div>
  );
}

export default CategoryDisplay