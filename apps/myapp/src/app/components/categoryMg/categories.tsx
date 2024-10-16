
"use client"

import CategoryDisplay from "./CategoryDisplay";

export default function getCategories() {
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-6 md:p-14">
      <CategoryDisplay url={"/category/veg.jpg"} category="Vegetarian" />
      <CategoryDisplay url={"/category/vegan2.jpg"} category="Vegan" />
      <CategoryDisplay url={"/category/italian2.jpg"} category="Italian" />
      <CategoryDisplay url={"/category/chinese.jpg"} category="Chinese" />
      <CategoryDisplay url={"/category/dessert.jpg"} category="Dessert" />
      <CategoryDisplay url={"/category/bev.jpg"} category="Beverages" />
    </div>
  );
}
