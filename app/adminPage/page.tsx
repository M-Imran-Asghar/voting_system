"use client"
import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  const handleImageChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  return (
    <div className="text-white p-4">
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {/* Image 1 */}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-200 mb-2">Image 1:</span>

          <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-400 text-xs">Upload Image 1</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange(setImage1)}
              className="hidden"
            />
          </label>

          {image1 && (
            <img
              src={URL.createObjectURL(image1)}
              alt="Preview 1"
              className="mt-3 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Image 2 */}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-200 mb-2">Image 2:</span>

          <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-400 text-xs">Upload Image 2</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange(setImage2)}
              className="hidden"
            />
          </label>

          {image2 && (
            <img
              src={URL.createObjectURL(image2)}
              alt="Preview 2"
              className="mt-3 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
          

      </div>
    </div>
  );
};

export default AdminPage;
