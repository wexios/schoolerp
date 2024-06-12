// SignInPage.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import './Login.sass';
import { loginUser } from '../../api/ApiClient';

interface SignInData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>();

  const onSubmit = async(data: SignInData) => {
    try {
        const result = await loginUser(String(data.username),String(data. password));
        // Handle successful login, such as storing tokens in local storage or state
        console.log('Login successful:', result);
      } catch (error:any) {
        console.log(error.message);
      }
    console.log('Username:', data.username);
    console.log('Password:', data.password);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder='Username'
            {...register('username', { required: true })}
          />
          {errors.username && <span className="error">Username is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='Password'
            {...register('password', { required: true })}
          />
          {errors.password && <span className="error">Password is required</span>}
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
