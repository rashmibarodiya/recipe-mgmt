

"use client"
import { useState } from "react";
import axios from "axios";

interface AddImageProps {
  onImageUpload: (url: string) => void; // Callback prop
}

export default function AddImage({ onImageUpload }: AddImageProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLAUDINARY_PRESET!);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLAUD_NAME}/image/upload`,
        formData
      );
      const secureUrl = res.data.secure_url;
      console.log("Image URL:", secureUrl); // Debug the URL
      onImageUpload(secureUrl); // Pass the uploaded URL to the parent
      setImagePreview(null); // Clear preview
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-60" />}
      <button onClick={uploadImage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
        Upload Image
      </button>
    </div>
  );
}
