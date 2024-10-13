
"use client"

import CategoryDisplay from "./CategoryDisplay";

export default function getCategories() {
  const veg =
    "https://img.freepik.com/free-photo/delicious-indian-food-tray_23-2148723505.jpg?w=826&t=st=1727194711~exp=1727195311~hmac=5d3326ba5d235770c1729a71e5e584be1337eb29e3b88a210994a21f9469ebcb";

  const vegan =
    "https://images.immediate.co.uk/production/volatile/sites/30/2018/06/Vegan-salad-bowl-499145d.jpg";
  const italian =
    "https://st2.depositphotos.com/1326558/7226/i/450/depositphotos_72263189-stock-photo-penne-pasta-in-tomato-sauce.jpg";

  const bev =
    "https://img.freepik.com/free-photo/view-delicious-milkshake-drink-with-bananas_23-2150822917.jpg?size=626&ext=jpg&ga=GA1.1.1016267300.1726994138&semt=ais_hybrid";
  const dessert =
    "https://img.freepik.com/free-photo/homemade-roasted-plum-ice-cream-recipe-food-photography_53876-96019.jpg?w=996&t=st=1726297575~exp=1726298175~hmac=9396b7e1326da8104c656c2e60d95d0cba4c52853b58ab24b5eefd733c544607";
  const chinese =
    "https://img.freepik.com/free-photo/pork-meatballs-dark-surface_1150-43612.jpg?w=996&t=st=1726297756~exp=1726298356~hmac=f85a4a1d3fc462e286dd92ee8594184e47f15a333d49248f715916afdb91e0e8";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-6 md:p-14">
      <CategoryDisplay url={veg} category="Vegetarian" />
      <CategoryDisplay url={vegan} category="Vegan" />
      <CategoryDisplay url={italian} category="Italian" />
      <CategoryDisplay url={chinese} category="Chinese" />
      <CategoryDisplay url={dessert} category="Dessert" />
      <CategoryDisplay url={bev} category="Beverages" />
    </div>
  );
}
