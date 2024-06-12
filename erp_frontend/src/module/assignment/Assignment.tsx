import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import SchoolErpClient from '../../api/ApiClient';

interface User {
  userId: number;
  username: string;
}

interface AssignmentFormData {
  userId: number;
  date: Date;
  subjectId: number;
  batchId: number;
  isActive: boolean;
  title: string;
  marks: number;
}

const AssignmentForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<AssignmentFormData>();
  const [batches, setBatches] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const batchResponse = await SchoolErpClient.get('/batches');
        setBatches(batchResponse.data);

        const subjectResponse = await SchoolErpClient.get('/subject');
        setSubjects(subjectResponse.data);

        const userResponse = await SchoolErpClient.get('/user');
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: AssignmentFormData) => {
    try {
      console.log("Subject",subjects.filter(s=>s.subjectName==data.subjectId))
      const jsonData ={
        "userId": Number(data.userId),
        "date": data.date,
        "subjectId": subjects.filter(s=>s.subjectName==data.subjectId)[0].subjectIId,
        "batchId":batches.filter(s=>s.batchName==data.batchId)[0].batchIId,
        "isActive": true,
        "title": data.title,
        "marks": Number(data.marks)
      }
      console.log(jsonData);
      const response = await SchoolErpClient.post('/assignment', jsonData);
      console.log('Assignment created:', response.data);
      // You can handle successful submission response here
    } catch (error) {
      console.error('Error creating assignment:', error);
      // You can handle error response here
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="userId" style={{ marginRight: '1rem' }}>User ID:</label>
        <Controller
          name="userId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} id="userId" style={{ width: '100%', padding: '0.5rem' }}>
              {users.map(user => (
                <option key={user.userId} value={user.userId}>{user.username}</option>
              ))}
            </select>
          )}
        />
        {errors.userId && <span>User ID is required</span>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="date" style={{ marginRight: '1rem' }}>Date:</label>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input type="date" {...field}  id="date" style={{ width: '100%', padding: '0.5rem' }} />
          )}
        />
        {errors.date && <span>Date is required</span>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="subjectId" style={{ marginRight: '1rem' }}>Subject ID:</label>
        <Controller
          name="subjectId"
          control={control}
          rules={{ required: true }}
          render={({ field:{value,onChange} }) => (
            <select value={value} onChange={onChange} id="subjectId" style={{ width: '100%', padding: '0.5rem' }}>
              {subjects.map(subject => (
                <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}</option>
              ))}
            </select>
          )}
        />
        {errors.subjectId && <span>Subject ID is required</span>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="batchId" style={{ marginRight: '1rem' }}>Batch ID:</label>
        <Controller
          name="batchId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} id="batchId" style={{ width: '100%', padding: '0.5rem' }}>
              {batches.map(batch => (
                <option key={batch.batchId} value={batch.batchId}>{batch.batchName}</option>
              ))}
            </select>
          )}
        />
        {errors.batchId && <span>Batch ID is required</span>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="isActive" style={{ marginRight: '1rem' }}>Active:</label>
        <Controller
          name="isActive"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <select {...field} id="isActive" style={{ width: '100%', padding: '0.5rem' }}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}
        />
        {errors.isActive && <span>Active status is required</span>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="title" style={{ marginRight: '1rem' }}>Title:</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input {...field} type="text" id="title" style={{ width: '100%', padding: '0.5rem' }} />
          )}
        />
        {errors.title && <span>Title is required</span>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="marks" style={{ marginRight: '1rem' }}>Marks:</label>
        <Controller
          name="marks"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input {...field} type="number" id="marks" style={{ width: '100%', padding: '0.5rem' }} />
          )}
        />
        {errors.marks && <span>Marks is required</span>}
      </div>
      <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none' }}>Submit</button>
    </form>
  );
};

export default AssignmentForm;

