import { useState } from 'react';
import courtsData from './data/courts.json';
import CourtList from './components/CourtList';
import CourtDetail from './components/CourtDetail';

export default function App() {
  const [courts, setCourts] = useState(courtsData);
  const [selectedCourtId, setSelectedCourtId] = useState(null);

  const selectedCourt = courts.find((court) => {
    return court.id === selectedCourtId;
  });

  const addReview = (courtId, review) => {
    setCourts((previousCourts) => {
      return previousCourts.map((court) => {
        if (court.id === courtId) {
          return {
            ...court,
            reviews: [review, ...court.reviews],
          };
        }

        return court;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedCourtId !== null ? (
        <CourtDetail
          court={selectedCourt}
          onBack={() => setSelectedCourtId(null)}
          onAddReview={addReview}
        />
      ) : (
        <CourtList
          courts={courts}
          onSelect={(court) => setSelectedCourtId(court.id)}
        />
      )}
    </div>
  );
}
