"use client"
import axios from "axios";
import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation
    if (!image1 || !image2 || !name1 || !name2 || !startTime || !endTime) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setMessage("End time must be after start time");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("name1", name1);
      formData.append("name2", name2);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);

      const response = await axios.post("/api/user/adminPage/",
         formData,
         { withCredentials: true }
      );

      console.log(response);
      
        setMessage("Failed to submit data");
      
    } catch (error) {
      setMessage("Error submitting data");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white h-[100vh]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto bg-gray-100 p-4 rounded-lg items-center justify-center shadow-2xl">
        <div className="flex justify-around gap-3">
          {/* Image 1 */}
          <div className="flex flex-col items-center">
            <span className="font-semibold mb-2 text-gray-600">Image 1:</span>
            <input 
              placeholder="Enter Name of person 1"
              className="border border-gray-600 text-gray-600 w-full my-3 py-2 rounded px-2"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              required
            />

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
                required
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
            <span className="font-semibold text-gray-600 mb-2">Image 2:</span>
            <input 
              placeholder="Enter Name of person 2"
              className="border border-gray-600 text-gray-600 w-full my-3 py-2 rounded px-2"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              required
            />

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
                required
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

        {/* Time Section */}
        <div className="bg-white p-4 rounded-lg w-full">
          <h3 className="font-semibold text-gray-600 mb-3">Time Settings</h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Start Time:</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-600"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">End Time:</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Message Display */}
        {message && (
          <div className={`p-2 rounded text-center ${
            message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminPage;