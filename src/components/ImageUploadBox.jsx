import { IoMdCloudUpload } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

const ImageUploadBox = ({ side, title, previewUrl, handleImageChange, resetImage }) => (
  <div className="flex flex-col space-y-2">
    <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    <div className="relative shadow-lg rounded-sm">
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={(e) => handleImageChange(e, side)}
        id={`${side}-upload`}
        className="hidden"
      />
      <label
        htmlFor={`${side}-upload`}
        className="relative block w-full h-40 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
      >
        {previewUrl ? (
          <div className="relative h-full rounded-lg">
            <img
              src={previewUrl}
              alt={`Aadhaar ${title}`}
              className="w-full h-full object-contain rounded-lg bg-black"
            />
          </div>
        ) : (
          <div className="flex flex-col bg-gray-100 rounded-lg items-center justify-center h-full space-y-2">
            <IoMdCloudUpload className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-purple-600">Click here to Upload/Capture</span>
          </div>
        )}
      </label>
    </div>

    {previewUrl && (
      <div className="mt-2 flex justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            resetImage(side);
          }}
          className="flex items-center text-gray-800 bg-neutral-500 px-2 py-1 rounded-full shadow-lg"
        >
          <FaCamera className="w-4 h-4 mr-1 text-white" />
          <span className="text-xs text-gray-200 px-2">Press to Re-capture/Upload</span>
        </button>
      </div>
    )}
  </div>
);

export default ImageUploadBox;
