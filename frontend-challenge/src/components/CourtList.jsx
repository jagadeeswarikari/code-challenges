import { useState, useMemo } from 'react';
import { calculateAverageRating, getRatingNumber } from '../utils/utils';

export default function CourtList({ courts, onSelect }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');

  const filteredAndSortedCourts = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    const filtered = courts.filter((court) => {
      const name = court.name.toLowerCase();
      const city = court.city.toLowerCase();

      if (searchText === '') return true;

      return name.includes(searchText) || city.includes(searchText);
    });

    const sorted = [...filtered].sort((a, b) => {
      const ratingA = getRatingNumber(a);
      const ratingB = getRatingNumber(b);

      if (sortBy === 'rating-asc') return ratingA - ratingB;
      if (sortBy === 'rating-desc') return ratingB - ratingA;

      return 0;
    });

    return sorted;
  }, [courts, query, sortBy]);

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      <div className="sticky top-0 z-10 bg-gray-50 p-4 space-y-3">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Court Review System</h1>
          <p className="text-sm text-gray-500">Find and review tennis courts</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search courts or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-44 rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="rating-desc">⭐ High → Low</option>
            <option value="rating-asc">⭐ Low → High</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {filteredAndSortedCourts.map((court) => {
          const avgRating = calculateAverageRating(court.reviews);

          return (
            <button
              key={court.id}
              onClick={() => onSelect(court)}
              className="w-full text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-medium">{court.name}</h2>
                  <p className="text-sm text-gray-500">
                    {court.city} • {court.surface}
                  </p>
                </div>

                <span className="text-sm font-semibold text-brand">
                  ⭐ {avgRating}
                </span>
              </div>
            </button>
          );
        })}

        {filteredAndSortedCourts.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-6">
            No courts found
          </p>
        )}
      </div>
    </div>
  );
}
