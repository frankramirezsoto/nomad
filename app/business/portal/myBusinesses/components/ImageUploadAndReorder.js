"use client";

import { useState, useEffect } from 'react';

const ImageUploadAndReorder = ({ images, setImages }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Convert Base64 images to image URLs when images change
    setImageUrls(images);
  }, [images]);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);

    // Convert files to Base64 and store them
    const base64Images = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(base64Images).then((base64Array) => {
      setImages(base64Array);
    });
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    setImages(newImages);
    setDraggedIndex(null);
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <div
        className="w-50 relative border-2 border-gray-300 hover:border-teal-600 hover:cursor-pointer border-dashed rounded-lg p-6 my-6"
        id="dropzone"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 z-50"
        />
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          />

          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-teal-600"> or browse</span>
              <span> to upload</span>
              <p className="text-gray-500">
                *The first image is the default image, you may drag and drop the images to sort them
              </p>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <div className="image-gallery">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className={`image-container ${
              index === 0 ? 'border-4 border-green-700' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <img src={imageUrl} alt={`Image ${index + 1}`} />
            <button onClick={() => handleDelete(index)}>&times;</button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .image-gallery {
          display: flex;
          flex-wrap: wrap;
        }
        .image-container {
          position: relative;
          margin: 5px;
          width: 150px; /* Set your preferred width */
          height: 150px; /* Set your preferred height */
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-container button {
          position: absolute;
          top: 5px;
          right: 5px;
          background: none;
          border: none;
          color: red;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ImageUploadAndReorder;



