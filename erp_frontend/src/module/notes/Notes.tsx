import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    userId: number;
    username: string;
}

interface Subject {
    subjectIId: number;
    subjectName: string;
}

interface Batch {
    batchIId: number;
    batchName: string;
}

const AddNotesPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
    const [notesName, setNotesName] = useState('');
    const [noteFile, setNoteFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>('http://localhost:8080/api/user');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchSubjects = async () => {
            try {
                const response = await axios.get<Subject[]>('http://localhost:8080/api/subject');
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        const fetchBatches = async () => {
            try {
                const response = await axios.get<Batch[]>('http://localhost:8080/api/batches');
                setBatches(response.data);
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        };

        fetchUsers();
        fetchSubjects();
        fetchBatches();
    }, []);

    const handleNotesSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!noteFile || !selectedUserId || !selectedSubjectId || !selectedBatchId || !notesName) {
            console.error('Please fill in all fields and select a file');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(noteFile);

        reader.onload = () => {
            // Extract base64 string from the reader result
            const base64String = reader.result?.toString().split(',')[1] || '';

            // Form data to be submitted
            const formData ={
                "subjectId":selectedSubjectId!.toString(),
                "notesName": notesName,
                "batchId": selectedBatchId!.toString(),
                "userId":selectedUserId!.toString(),
                "noteFile": base64String,
                "isActive": true
              }
           

            // Send POST request
            axios.post('http://localhost:8080/api/note', formData)
                .then(response => {
                    console.log('Notes added successfully:', response.data);
                    // Clear form fields after successful submission
                    setSelectedUserId(null);
                    setSelectedSubjectId(null);
                    setSelectedBatchId(null);
                    setNotesName('');
                    setNoteFile(null);
                })
                .catch(error => {
                    console.error('Error adding notes:', error);
                });
        };

        reader.onerror = () => {
            console.error('Error reading the file');
        };
    };

    return (
        <div>
            <h2>Add Notes</h2>
            <form onSubmit={handleNotesSubmit}>
                <div>
                    <label>User ID:</label>
                    <select value={selectedUserId} onChange={(e) => setSelectedUserId(parseInt(e.target.value))}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.userId} value={user.userId}>{user.username}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Subject ID:</label>
                    <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(parseInt(e.target.value))}>
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.subjectIId} value={subject.subjectIId}>{subject.subjectName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Batch ID:</label>
                    <select value={selectedBatchId} onChange={(e) => setSelectedBatchId(parseInt(e.target.value))}>
                        <option value="">Select Batch</option>
                        {batches.map(batch => (
                            <option key={batch.batchIId} value={batch.batchIId}>{batch.batchName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Notes Name:</label>
                    <input type="text" value={notesName} onChange={(e) => setNotesName(e.target.value)} />
                </div>
                <div>
                    <label>Upload Notes:</label>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setNoteFile(e.target.files?.[0] || null)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddNotesPage;
