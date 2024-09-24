import React, { useState } from "react";
import axios from "axios";

interface AddImageProps {
  onImageUpload: (url: string) => void;
}

const AddImage: React.FC<AddImageProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
   
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the 10MB limit. Please upload a smaller image.");
        setImage(null);
        setPreview(null);
      } else {
        setImage(file);
        setPreview(URL.createObjectURL(file)); 
      }
    }
  };
  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLAUDINARY_PRESET!); // Ensure env vars are loaded

    // Log env variables to debug potential issues
    console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLAUD_NAME);
    console.log("Upload Preset:", process.env.NEXT_PUBLIC_CLAUDINARY_PRESET);

    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLAUD_NAME}/image/upload`,
        formData
      );
      const secureUrl = res.data.secure_url;
      onImageUpload(secureUrl); 
    } catch (error: any) {
     
      console.error("Error uploading image:", error.response ? error.response.data : error.message);
      alert("Failed to upload the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {preview && (
        <img src={preview} alt="Image Preview" className="mb-4 w-32 h-32 object-cover" />
      )}
      {image && (
        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      )}
    </div>
  );
};

export default AddImage;
