import React from "react";
import CreateNotePage from "./pages/CreateNotePage";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
