import { LazyLoadImage } from "react-lazy-load-image-component";
import { SlOptionsVertical } from "react-icons/sl";
import SkeletonLoader from "../components/SkeletonLoader";
import { useEffect, useState } from "react";
import { getImages } from "../api/imagesApi";
import PreviewModel from "../components/PreviewModal";
import Modal from "../components/Modal";
const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const data = await getImages();
      setLoading(false);
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="h-[90vh] flex flex-wrap content-start overflow-y-scroll gap-14 p-4 sm:gap-x-6">
      {images.map((item, index) => (
        <div
          className="w-full h-fit sm:w-[28rem] relative hover:cursor-pointer"
          key={index}
        >
          <div
            onClick={() => setCurrentIndex(index)}
            className="overflow-hidden rounded-t-lg"
          >
            <LazyLoadImage
              className="aspect-video w-full 
                        hover:scale-110 hover:rotate-2 transition-transform duration-300"
              src={item.imageUrl}
              alt="img"
            />
          </div>

          <div className="flex justify-between items-start absolute w-full">
            <div
              className="bg-white shadow-lg py-2 flex items-center
                             justify-between w-full transition-colors px-2 hover:bg-slate-400"
            >
              <div className="text-sm max-w-[20rem] overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title || "No Title"}
              </div>
              <button
                onClick={() => setSelectedImage(item)}
                className="text-2xl font-bold"
              >
                <SlOptionsVertical />
              </button>
            </div>
          </div>
        </div>
      ))}
      {loading && <SkeletonLoader />}
      {currentIndex !== null && (
        <PreviewModel
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          images={images}
        />
      )}
      {selectedImage && (
        <Modal
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          setImages={setImages}
        />
      )}
    </div>
  );
};

export default Home;
