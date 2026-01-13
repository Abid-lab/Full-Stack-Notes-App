import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.post(`/notes`);
        setNotes(res.data);
      } catch (error) {
        console.log("Error To fetch Data!", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Navbar />

        <div className="max-w-6xl mx-auto p-4 pt-6">
          {isloading && (
            <p className="text-gray-500 text-center py-4">Loading notes...</p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.length > 0
              ? notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))
              : !isloading && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No notes yet. Create your first note!
                    </p>
                  </div>
                )}
          </div>

          {/* Add Note Button */}
          <div className="flex justify-center mt-8">
            <Link
              to={"/create"}
              className="px-6 py-3 bg-gradient from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-black rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              + Add Note
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
