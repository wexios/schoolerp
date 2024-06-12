import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
    notesId: number;
    userId: number;
    subjectId: number;
    batchId: number;
    notesName: string;
    noteFile: string;
}

const AllNotesPage: React.FC = () => {
    const [allNotes, setAllNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const response = await axios.get<Note[]>('http://localhost:8080/api/note');
                setAllNotes(response.data);
            } catch (error) {
                console.error('Error fetching all notes:', error);
            }
        };

        fetchAllNotes();
    }, []);

    const downloadNote = (noteFile: string, notesName: string) => {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${noteFile}`;
        link.download = `${notesName}.pdf`;
        link.click();
    };
    

    return (
        <div>
            <h2>All Notes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Notes ID</th>
                        <th>User ID</th>
                        <th>Subject ID</th>
                        <th>Batch ID</th>
                        <th>Notes Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allNotes.map(note => (
                        <tr key={note.notesId}>
                            <td>{note.notesId}</td>
                            <td>{note.userId}</td>
                            <td>{note.subjectId}</td>
                            <td>{note.batchId}</td>
                            <td>{note.notesName}</td>
                            <td>
                                <button onClick={() => downloadNote(note.noteFile, note.notesName)}>Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllNotesPage;
