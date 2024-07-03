import PropTypes from "prop-types";
import { GrNext, GrPrevious } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PreviewModel = ({ currentIndex, setCurrentIndex, images }) => {
  const handleNext = () => {
    if (currentIndex === images.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        className="className='bg-white w-[90vw] sm:w-4/6 rounded-lg p-4 sm:p-8 flex 
            flex-col text-black relative'"
      >
        <div
          onClick={() => setCurrentIndex(null)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 h-8 w-8 flex flex-col justify-center items-center
                rounded-full cursor-pointer bg-black text-white"
        >
          X
        </div>
        <div
          onClick={handleNext}
          className="absolute shadow-2xl cursor-pointer top-1/2 right-10 bg-white rounded-full p-2 sm:p-5 transform -translate-y-1/2"
        >
          <GrNext />
        </div>
        <div
          onClick={handlePrevious}
          className="absolute shadow-2xl cursor-pointer top-1/2 left-10 bg-white rounded-full p-2 sm:p-5 transform -translate-y-1/2"
        >
          <GrPrevious />
        </div>
        {images && currentIndex !== null && (
          <>
            <LazyLoadImage
              className="aspect-video w-full rounded-2xl"
              src={images[currentIndex].imageUrl}
              alt="Image"
            />
            <p className="text-black mt-2 text-sm sm:text-base">
              {images[currentIndex].title || "No Title"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewModel;

PreviewModel.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
