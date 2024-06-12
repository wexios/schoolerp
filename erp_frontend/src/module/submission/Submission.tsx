import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

interface Assignment {
  assignmentId: number;
  title: string;
}

interface User {
  userId: number;
  username: string;
}

interface FormData {
  userId: number;
  date: string;
  assignmentId: number;
  isActive: boolean;
  fileData: string | null; // Type for base64 encoded file data
}

const SubmissionForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [fileData, setFileData] = useState<string | null>(null); // State to store base64 encoded file data

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get<Assignment[]>('http://localhost:8080/api/assignment');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:8080/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAssignments();
    fetchUsers();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        fileData: fileData
      };

      const response = await axios.post('http://localhost:8080/api/submission', payload);
      console.log('Submission successful:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result?.toString() ?? null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Submission Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>User ID:</label>
          <Controller
            name="userId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field} style={{ width: '100%', padding: '0.5rem' }}>
                {users.map(user => (
                  <option key={user.userId} value={user.userId}>{user.username}</option>
                ))}
              </select>
            )}
          />
          {errors.userId && <span>User ID is required</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date:</label>
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input type="date" {...field} style={{ width: '100%', padding: '0.5rem' }} />
            )}
          />
          {errors.date && <span>Date is required</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Assignment ID:</label>
          <Controller
            name="assignmentId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field} style={{ width: '100%', padding: '0.5rem' }}>
                {assignments.map(assignment => (
                  <option key={assignment.assignmentId} value={assignment.assignmentId}>{assignment.title}</option>
                ))}
              </select>
            )}
          />
          {errors.assignmentId && <span>Assignment ID is required</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Active:</label>
          <Controller
            name="isActive"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            )}
          />
          {errors.isActive && <span>Active status is required</span>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Upload File:</label>
          <input type="file" onChange={handleFileChange} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none' }}>Submit</button>
      </form>
    </div>
  );
};

export default SubmissionForm;
