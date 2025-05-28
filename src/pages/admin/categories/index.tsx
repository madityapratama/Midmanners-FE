// pages/admin/categories.tsx
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Trash2, Plus, Edit, Check, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { withRoleProtection } from '@/hoc/withRoleProtection';

type Category = {
  id: number;
  category_name: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { category_name: newCategory }
      );
      setCategories([...categories, response.data]);
      setNewCategory('');
      setError('');
      setSuccess('Category added successfully!');
      fetchCategories() 
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {});
      setCategories(categories.filter(category => category.id !== id));
      setError('');
      setSuccess('Category deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditValue(category.category_name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleUpdateCategory = async (id: number) => {
    if (!editValue.trim()) return;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
        { category_name: editValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCategories(categories.map(cat => 
        cat.id === id ? response.data : cat
      ));
      setEditingId(null);
      setSuccess('Category updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update category');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
            <X className="mr-2" size={20} />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-teal-50 text-teal-700 rounded-lg border border-teal-200 flex items-center">
            <Check className="mr-2" size={20} />
            {success}
          </div>
        )}

        {/* Add Category Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Electronics, Clothing"
              className="flex-1 px-4 py-3 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Existing Categories</h2>
          </div>
          
          {categories.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="mb-2">No categories found</p>
              <p className="text-sm">Start by adding your first category above</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {categories.map((category) => (
                <li key={category.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">{category.category_name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRoleProtection(CategoriesPage,['admin']);