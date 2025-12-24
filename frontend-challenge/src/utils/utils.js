export function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  let totalRating = 0;

  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  const average = totalRating / reviews.length;

  return average.toFixed(1);
}

export function getRatingNumber(court) {
  if (!court || !court.reviews) {
    return 0;
  }

  const avgRating = calculateAverageRating(court.reviews);
  const ratingNumber = Number(avgRating);

  if (isNaN(ratingNumber)) {
    return 0;
  }

  return ratingNumber;
}

export function formatDate(dateString) {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
