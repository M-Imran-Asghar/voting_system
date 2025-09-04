"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaRegThumbsUp } from "react-icons/fa";

// Define type for Person with votes
interface Person {
  id: number;
  name: string;
  img: string;
  votes: number;
}

// Static data (can later be replaced with API data)
const personDetails: Person[] = [
  { id: 1, name: "Person A", img: "/assets/bg-img.png", votes: 0 },
  { id: 2, name: "Person B", img: "/assets/bg-img.png", votes: 0 },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [personData, setPersonData] = useState<Person[]>(personDetails);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set a target end time (e.g., 1 hour from now)
  const targetTime = new Date();
  targetTime.setMinutes(targetTime.getMinutes() + 10); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Calculate time difference
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVoteBtn = (id: number): void => {
    setPersonData(prevData =>
      prevData.map(person =>
        person.id === id
          ? { ...person, votes: person.votes + 1 }
          : person
      )
    );
  };

  return (
    <div>
      {/* NAVBAR + TIME */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mx-10 mt-6 p-6 rounded-xl shadow-2xl border border-white/20 flex flex-col justify-center items-center">
        <nav>
          <ul className="flex space-x-8 text-white font-bold text-lg">
            <li className="cursor-pointer group relative">
              <span className="text-white group-hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-md group-hover:bg-white/10">
                Home
              </span>
            </li>
            <li className="cursor-pointer group relative">
              <span className="text-white group-hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-md group-hover:bg-white/10">
                About
              </span>
            </li>
            <li className="cursor-pointer group relative">
              <span className="text-white group-hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-md group-hover:bg-white/10">
                Contact
              </span>
            </li>
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
      <div className="bg-white mx-10 mb-6 p-6 rounded-xl shadow-2xl border border-white/20 flex flex-col justify-center items-center">
        {personData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {personData.map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
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
                    className="text-3xl text-gray-600 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-125 hover:-translate-y-1"
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

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg text-center text-white w-full">
          
        </div>
      </div>
    </div>
  );
}
