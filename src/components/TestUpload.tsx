import React, { useState } from "react";
import { toBase64 } from "lib/toBase64";
import { uploadProfilePic } from "apis/employee.api";

const TestUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const base64Image = await toBase64(selectedImage);

    try {
      const response = await uploadProfilePic(base64Image);
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit} disabled={isLoading}>
        Upload Profile Image
      </button>
    </div>
  );
};

export default TestUpload;
