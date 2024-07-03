import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../api/imagesApi";
import Loader from "../components/Loader";
import { convertToBase64 } from "../utils/helpers";

const UploadImage = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const base64 = await convertToBase64(event.target.files[0]);

      setFile(base64);
    }
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDiscard(e) {
    e.preventDefault();

    setFile("");
    setTitle("");
    setKey((prevKey) => prevKey + 1);
  }

  async function handleUploadImage(event) {
    event.preventDefault();
    try {
      if (!file) return;

      setLoading(true);

      const payload = {
        title: title,
        image: file,
      };

      await uploadImage(payload);

      setFile("");
      setTitle("");
      setKey((prevKey) => prevKey + 1);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-full absolute w-full right-0 p-4 sm:p-8">
      <div className="bg-white p-6 w-full sm-w-[600px] rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <form onSubmit={handleUploadImage} className="space-y-4 flex flex-col">
          <input
            key={key}
            onChange={handleFileChange}
            type="file"
            className="border-gray-300 border p-2 rounded-md"
          />
          <input
            value={title}
            onChange={handleTitleChange}
            type="text"
            placeholder="Image Title"
            className="border-gray-300 border p-2 rounded-md"
          />
          {!loading ? (
            <div className="flex justify-end gap-2">
              <button
                onClick={handleDiscard}
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              >
                Discard
              </button>
              <button
                disabled={!file}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-70"
              >
                Upload
              </button>
            </div>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
