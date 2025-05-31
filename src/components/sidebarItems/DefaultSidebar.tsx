import { LayoutPanelTop } from "lucide-react";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Category = {
  id: number;
  category_name: string;
};

const DefaultSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await response.data;
        setCategories(data);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
      <ul>
        <h2 className="text-2xl font-bold mb-4 text-indigo-950">Kategori</h2>
      {categories.map((category) => (
        <li
          key={category.id}
          onClick={() => handleCategoryClick(category.category_name)}
          className={`flex items-center space-x-2 cursor-pointer mb-2 ${
            selectedCategory === category.category_name
              ? "text-indigo-800 font-semibold"
              : "text-zinc-900 hover:text-indigo-800"
          }`}
        >
          <LayoutPanelTop className="w-5 h-5" />
          <span>{category.category_name}</span>
        </li>
      ))}
    </ul>
  );
};

export default DefaultSidebar;
