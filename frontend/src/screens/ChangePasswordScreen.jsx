import { useState } from 'react';
import { useChangePasswordMutation } from '../slices/usersApiSlice';
import styles from '../css/login.module.css';
import Navbar from '../components/Navbar';

const ChangePasswordScreen = () => {
  const [changePasswordApi, { isLoading }] = useChangePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await changePasswordApi({ currentPassword, newPassword });
      alert('Password changed successfully');
    } catch (error) {
      alert('Failed to change password');
    }
  };

  return (
    <main className={styles.main} style={{ height: '96vh' }}>
      <Navbar />
      <div className={styles.container}>
        <form
          className={styles.loginForm}
          onSubmit={submitHandler}
        >
          <h2>Change Password</h2>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className={styles.input}
              required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              name="newPassword"
              id='newPassword'
              value={newPassword}
              className={styles.input}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required />
          </div>
          <div className={styles.formGroup}>
            <button className={styles.button} type="submit"
              disabled={isLoading}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePasswordScreen;
