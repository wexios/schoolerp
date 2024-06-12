import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <h1>School ERP System</h1>
    <nav>
      <ul>
        <li><Link to="/assignment">Assignment</Link></li>
        <li><Link to="/submission">Submission</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/notes">Add Notes</Link></li>
        <li><Link to="/all-notes">All Notes</Link></li>
      </ul>
    </nav>
  </div>
);

export default LandingPage;
