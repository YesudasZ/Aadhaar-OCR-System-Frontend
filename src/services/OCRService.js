const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const validateFile = (file) => {
  if (!file) return "No file selected";
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return "Invalid file type. Please upload PNG, JPEG, JPG, or WEBP images only.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds 5MB limit";
  }
  return null;
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const processAadhaarOCR = async (frontImage, backImage) => {
  const response = await fetch("http://localhost:5000/api/ocr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      frontImage,
      backImage,
    }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to extract data");
  }

  return data.data;
};
