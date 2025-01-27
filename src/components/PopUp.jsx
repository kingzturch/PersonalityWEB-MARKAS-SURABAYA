import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DescriptionAPI from '../API/DescriptionAPI';

const PopUp = ({ isOpen, toggleModal }) => {
  const roles = Object.entries(DescriptionAPI);
  const [currentIndex, setCurrentIndex] = useState(roles.length > 0 ? 0 : null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? roles.length - 1 : prevIndex - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === roles.length - 1 ? 0 : prevIndex + 1));
  };

  const currentRole = roles.length > 0 ? roles[currentIndex] : null;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Tombol Tutup */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="mb-4 text-xl font-semibold text-gray-700 text-center md:text-left">Role</h2>

        {/* Konten Role */}
        {currentRole ? (
          <div className="relative flex items-center">
            {/* Tombol Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-red-500 text-white rounded-full hover:bg-red-600" // Tambahkan left-4 untuk jarak
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8" /* Perbesar ukuran ikon */
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-lg mx-auto">
              <img
                src={currentRole[1].image}
                alt={currentRole[0]}
                className="rounded w-full h-48 md:h-64 lg:h-72 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center md:text-left">
                {currentRole[0]}
              </h3>
              <p className="text-sm text-gray-600 text-justify mt-2">
                {currentRole[1].description}
              </p>
            </div>

            {/* Tombol Next */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-red-500 text-white rounded-full hover:bg-red-600" // Tambahkan right-4 untuk jarak
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8" /* Perbesar ukuran ikon */
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No data available.</p>
        )}
      </div>
    </div>
  );
};

PopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default PopUp;
