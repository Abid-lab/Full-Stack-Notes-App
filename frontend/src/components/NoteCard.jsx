import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../libs/utils";
import API from "../libs/axios";

function NoteCard({ note, setNotes }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteItem = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setIsDeleting(true);
    try {
      // Implement delete functionality here
      await API.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter(note._id !== id));
      window.location.reload();
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link to={`/notes/${note._id}`}>
      <div className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
          {note.title}
        </h2>

        {/* Content */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {note.content}
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gray-100" />

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatDate(new Date(note.createdAt))}</span>

          <div className="flex items-center gap-3 opacity-100 group-hover:transition">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <Pencil size={14} />
              Edit
            </button>

            <button
              onClick={(e) => deleteItem(e, note._id)}
              className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
