// pages/search.tsx
import { useState } from 'react';
import axios from 'axios';
import Recipe from '@/types/recipe'; // Adjust the import path to where your types are defined

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/search`, { params: { query } });
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        className="border p-2"
      />
      <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {loading && <p>Loading...</p>}
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((recipe) => (
            <div key={recipe._id} className="border p-4 mb-4 rounded">
              <h3 className="text-xl font-bold">{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p className="italic">Category: {recipe.category}</p>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
