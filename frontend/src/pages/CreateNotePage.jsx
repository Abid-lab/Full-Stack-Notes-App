import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import API from "../libs/axios";
function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !content) {
      toast.error("Please fill in both title and content");
      return;
    }

    setIsLoading(true);
    try {
      await API.post(`/notes`, {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note:", error);
      toast.error("Failed to create note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition mb-4"
          >
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Create New Note
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter note title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Content
              </label>
              <textarea
                rows={6}
                placeholder="Write your note here..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-black rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotePage;
