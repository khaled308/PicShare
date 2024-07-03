import propTypes from "prop-types";
import { useState } from "react";
import Loader from "./Loader";
import { deleteImage, updateImage } from "../api/imagesApi";

const Modal = ({ setSelectedImage, selectedImage, setImages }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(selectedImage?.title);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = async () => {
    setLoading(true);
    await updateImage(selectedImage._id, { title });
    setLoading(false);
    setSelectedImage(null);

    setImages((prevImages) =>
      prevImages.map((image) => {
        if (image._id === selectedImage._id) {
          return { ...image, title };
        }
        return image;
      })
    );
  };

  const handleImageDelete = async () => {
    setLoading(true);
    await deleteImage(selectedImage._id);
    setLoading(false);
    setSelectedImage(null);

    setImages((prevImages) =>
      prevImages.filter((image) => image._id !== selectedImage._id)
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-150 bg-black bg-opacity-75 transform scale-100">
      <div className="bg-white w-11/12 sm:w-[500px] h-80 rounded-lg p-4 sm:p-8 flex justify-between items-center text-white relative">
        <div
          onClick={() => {
            setSelectedImage(null);
          }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 h-8 w-8 flex justify-center items-center rounded-full
                
                cursor-pointer bg-black"
        >
          X
        </div>{" "}
        {!isUpdate && !loading && (
          <>
            <button
              onClick={() => setIsUpdate(true)}
              className="bg-blue-500 font-extrabold h-16 w-48 py-4 px-2 rounded-xl text-sm sm:text-base"
            >
              Update Image Title
            </button>
            <button
              onClick={handleImageDelete}
              className="bg-red-500 font-extrabold h-16 w-48 py-4 px-2 rounded-xl text-sm sm:text-base"
            >
              Delete Image
            </button>
          </>
        )}
        {isUpdate && !loading && (
          <div className="flex w-full flex-col gap-4">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              type="text"
              autoFocus
              className="w-full h-12 rounded-lg bg-slate-300 text-black px-5 text-sm sm:text-base"
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={() => {
                  setIsUpdate(false);
                }}
                className="bg-gray-700 p-4 w-full hover:bg-gray-900 text-white rounded-md text-sm sm:text-base"
              >
                Discard
              </button>
              <button
                onClick={() => {
                  handleUpdate();
                }}
                className="bg-blue-500 p-4 w-full hover:bg-blue-700 text-white rounded-md text-sm sm:text-base"
              >
                Update
              </button>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex w-full justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  setSelectedImage: propTypes.func.isRequired,
  selectedImage: propTypes.string.isRequired,
  setImages: propTypes.func.isRequired,
};
