import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    userId: number;
    username: string;
}

interface Attendance {
    studentId: number;
    date: string;
    techerId: number;
    subjectId: number;
    isPresent: boolean;
}

const AttendancePage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [teacherId, setTeacherId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>('http://localhost:8080/api/user');
                const filteredUsers = response.data.filter(user => user.userId !== 2);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
        setTeacherId(2); // Set user 2 as teacherId
        fetchAttendanceData(selectedDate); // Fetch attendance data for the initial selected date
    }, []);

    const handleAttendanceChange = async (userId: number, isPresent: boolean) => {
        try {
            await axios.post('http://localhost:8080/api/attendance', {
                studentId: userId,
                date: selectedDate,
                techerId: teacherId,
                subjectId: 1, // Assuming subjectId is fixed for all entries
                isPresent
            });
            console.log(`Attendance marked for user with ID ${userId}`);
            fetchAttendanceData(selectedDate); // Refresh attendance data after marking
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };

    const fetchAttendanceData = async (date: string) => {
        try {
            const response = await axios.get<Attendance[]>(`http://localhost:8080/api/attendance?date=${date}`);
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    return (
        <div>
            <h2>Attendance Page</h2>
            <div>
                <button onClick={() => fetchAttendanceData(selectedDate)}>Refresh Attendance</button>
            </div>
            <div>
                <label htmlFor="date">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleAttendanceChange(user.userId, e.target.checked)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {attendanceData.length > 0 && (
                <div>
                    <h2>Attendance Data for {selectedDate}</h2>
                    <table>
                        <thead>
                            <tr>
                            <th>SL No</th>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Attendance</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((attendance, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{attendance.studentId}</td>
                                    <td>{users.find(user => user.userId === attendance.studentId)?.username}</td>
                                    <td>{attendance.isPresent ? 'Present' : 'Absent'}</td>
                                    <td>{new Date(attendance.date).toLocaleDateString()}</td> {/* New table cell for date */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AttendancePage;
