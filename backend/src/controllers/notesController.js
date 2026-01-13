import { Note } from "../models/NoteModel.js"


export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Error fetching notes', error });
    }
}


export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found!" })
        res.status(200).json(note);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Error fetching notes', error });
    }
}



export async function createNote(req, res) {

    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: 'Note Created Successfully!' })

    } catch (error) {
        console.error('Error Creating notes:', error);
        res.status(500).json({ message: 'Error Creating notes', error });
    }

}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content })
        if (!updatedNote) return res.status(404).json({ message: "Note not found!" })

        res.status(200).json({ message: 'Note Updated Successfully!' })
    } catch (error) {
        console.error('Error Updating notes:', error);
        res.status(500).json({ message: 'Error Updating notes', error });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNotes = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNotes) return res.status(404).json({ message: "Note not found!" })
        res.json(deletedNotes)
        res.status(200).json({ message: 'Note deleted Successfully!' })
    } catch (error) {
        console.error('Error Updating notes:', error);
        res.status(500).json({ message: 'Error Updating notes', error });
    }
}
