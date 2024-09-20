
"use client"
import { useState } from "react";
import axios from "axios";

export default function AddImage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset",process.env.NEXT_PUBLIC_CLAUDINARY_PRESET!); // Replace with your Cloudinary upload preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLAUD_NAME}/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );

      console.log("claudname",process.env.CLAUD_NAME!)
      const { secure_url } = res.data;
      setImageUrl(secure_url); // Update the state with the uploaded image URL
    } catch (error) {
      console.error("Error uploading image", error);
      alert(error)
    }
  };

  return (
    <div>
      <input
      className="text-black"
        type="file"
        onChange={(e) => {
          if (e.target.files) setImage(e.target.files[0]);
        }}
      />
      <button
        onClick={uploadImage}
        className="mt-20 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Upload
      </button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4 w-60" />}
    </div>
  );
}
