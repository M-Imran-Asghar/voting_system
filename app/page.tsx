"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaRegThumbsUp } from "react-icons/fa";

interface Person {
  id: string;      // from _id
  name: string;    // personOne / personTwo
  img: string;     // imageOne / imageTwo
  votes: number;   // local vote counter
  startTime: string;
  endTime: string;
}

export default function Home() {
  const [personData, setPersonData] = useState<Person[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // ✅ Vote handler (string ID)
  const handleVoteBtn = (id: string): void => {
    setPersonData(prevData =>
      prevData.map(person =>
        person.id === id
          ? { ...person, votes: person.votes + 1 }
          : person
      )
    );
  };

  // ✅ Fetch API Data
  const getAllData = async () => {
    try {
      const response = await axios.get("/api/user/adminPage/");
      const rawData = response.data.data;

      if (rawData.length > 0) {
        const entry = rawData[0]; // take first contest for now

        const people: Person[] = [
          {
            id: entry._id + "-1",
            name: entry.personOne,
            img: entry.imageOne?.startsWith("http")
              ? entry.imageOne
              : `data:image/jpeg;base64,${entry.imageOne}`, // ✅ handle base64
            votes: 0,
            startTime: entry.startTime,
            endTime: entry.endTime,
          },
          {
            id: entry._id + "-2",
            name: entry.personTwo,
            img: entry.imageTwo?.startsWith("http")
              ? entry.imageTwo
              : `data:image/jpeg;base64,${entry.imageTwo}`,
            votes: 0,
            startTime: entry.startTime,
            endTime: entry.endTime,
          },
        ];

        setPersonData(people);

        // Start countdown with API times
        startCountdown(entry.startTime, entry.endTime);
      }
    } catch (error) {
      console.error("Error while getting all data ", error);
    }
  };

  // ✅ Countdown setup
  const startCountdown = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    const timer = setInterval(() => {
      const now = Date.now();

      if (now < startTime) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else if (now > endTime) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const distance = endTime - now;
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    // ✅ Cleanup interval
    return () => clearInterval(timer);
  };

  // ✅ Run once
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      {/* NAVBAR + TIME */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mx-10 mt-6 p-6 rounded-xl shadow-2xl border border-white/20 flex flex-col justify-center items-center">
        <nav>
          <ul className="flex space-x-8 text-white font-bold text-lg">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* Time Counter */}
        <div className="mt-6 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold mb-2">Voting Ends In</h2>
          <div className="text-3xl font-mono font-extrabold">
            {timeLeft.hours.toString().padStart(2, "0")}:
            {timeLeft.minutes.toString().padStart(2, "0")}:
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* PEOPLE SECTION */}
      <div className="bg-white mx-10 mb-6 p-6 rounded-xl shadow-2xl flex flex-col justify-center items-center">
        {personData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {personData.map((person) => (
              <div key={person.id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow">
                <div className="relative w-32 h-32">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="rounded-full object-cover border-4 border-indigo-500 shadow-md"
                  />
                </div>
                <p className="mt-3 text-lg font-semibold text-gray-800">{person.name}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="text-3xl text-gray-600 hover:text-blue-500 transition-all"
                    onClick={() => handleVoteBtn(person.id)}
                  >
                    <FaRegThumbsUp />
                  </button>
                  <span className="ml-2 text-gray-700">Total Vote: {person.votes}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 font-medium">Data not found</div>
        )}
      </div>
    </div>
  );
}
