import { useState, useEffect } from "react";
import ImageUploadBox from "./components/ImageUploadBox";
import { validateFile, convertToBase64, processAadhaarOCR } from "./services/OCRService";
import ErrorDisplay from "./components/ErrorDisplay";
import ExtractedDataDisplay from "./components/ExtractedDataDisplay";
import { RefreshCw } from "lucide-react";

const AadhaarOCR = () => {
  const [images, setImages] = useState({ front: null, back: null });
  const [previewUrls, setPreviewUrls] = useState({ front: null, back: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrls.front) URL.revokeObjectURL(previewUrls.front);
      if (previewUrls.back) URL.revokeObjectURL(previewUrls.back);
    };
  }, [previewUrls]);

  const handleImageChange = async (e, side) => {
    const file = e.target.files[0];
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      setExtractedData(null);

      const previewUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [side]: previewUrl }));

      const base64String = await convertToBase64(file);
      setImages((prev) => ({ ...prev, [side]: base64String }));
    } catch (err) {
      setError("Error processing image: " + err.message);
    }
  };

  const resetImage = (side) => {
    if (previewUrls[side]) URL.revokeObjectURL(previewUrls[side]);
    setPreviewUrls((prev) => ({ ...prev, [side]: null }));
    setImages((prev) => ({ ...prev, [side]: null }));
    setExtractedData(null);
  };

  const processAadhaar = async () => {
    if (!images.front || !images.back) {
      setError("Please upload both front and back images");
      return;
    }

    setLoading(true);
    setError(null);
    setExtractedData(null);

    try {
      const data = await processAadhaarOCR(images.front, images.back);
      setExtractedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Aadhaar Card OCR System
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 px-4">
        <div className="space-y-6 w-full lg:w-1/2 px-4 lg:px-20 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <ImageUploadBox
              side="front"
              title="Aadhaar Front"
              previewUrl={previewUrls.front}
              handleImageChange={handleImageChange}
              resetImage={resetImage}
            />
            <ImageUploadBox
              side="back"
              title="Aadhaar Back"
              previewUrl={previewUrls.back}
              handleImageChange={handleImageChange}
              resetImage={resetImage}
            />
          </div>
          <button
            className={`w-full py-3 px-4 rounded-2xl font-medium transition-colors ${
              loading || !images.front || !images.back
                ? "bg-blue-700 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={processAadhaar}
            disabled={loading || !images.front || !images.back}
          >
            {loading ? "Processing..." : "PARSE AADHAAR"}
          </button>
          {error && <ErrorDisplay message={error} />}
        </div>
          <div className="hidden lg:block border-l border-gray-300"></div>

        {extractedData && <ExtractedDataDisplay extractedData={extractedData} />}
      </div>
    </div>
  );
};

export default AadhaarOCR;
