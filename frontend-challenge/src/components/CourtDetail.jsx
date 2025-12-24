import { useState, useEffect, useMemo } from 'react';
import { calculateAverageRating, formatDate } from '../utils/utils';

export default function CourtDetail({ court, onBack, onAddReview }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);

  const averageRating = useMemo(() => {
    return calculateAverageRating(court.reviews);
  }, [court.reviews]);

  const handleSubmit = () => {
    if (comment.trim() === '') return;

    const newReview = {
      author: 'You',
      rating: rating,
      comment: comment,
      createdAt: new Date().toISOString(),
    };

    onAddReview(court.id, newReview);

    setComment('');
    setRating(5);
    setShowSuccess(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      <div className="sticky top-0 bg-gray-50 p-4 z-10">
        <button onClick={onBack} className="text-sm text-brand mb-2">
          ← Back
        </button>

        <h1 className="text-2xl font-semibold">{court.name}</h1>
        <p className="text-sm text-gray-500">
          {court.city} • {court.surface}
        </p>

        <p className="text-sm font-medium mt-1">
          ⭐ {averageRating} ({court.reviews.length} reviews)
        </p>

        {showSuccess && (
          <p className="text-sm text-green-600 mt-1">
            Review added successfully
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-medium mb-3">Leave a review</h2>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your experience..."
            rows={3}
            className="w-full border rounded-lg px-3 py-2 mb-2 resize-none"
          />

          <div className="flex gap-2">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 w-32"
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} Star
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="flex-1 bg-brand text-white rounded-lg py-2 font-medium hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {court.reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-3 shadow-sm ${
                index === 0 && showSuccess ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <div className="flex justify-between">
                <p className="text-sm font-medium">
                  {review.author} • ⭐ {review.rating}
                </p>
                <span className="text-xs text-gray-400">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
