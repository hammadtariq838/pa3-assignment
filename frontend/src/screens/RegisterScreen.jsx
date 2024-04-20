import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Navbar from '../components/Navbar';
import styles from '../css/register.module.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/browse');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ username, password, name }).unwrap();
      alert('Register successful');
      dispatch(setCredentials({ ...res }));
      navigate('/browse');
    } catch (err) {
      alert(`Failed to register: ${err?.data?.message || err.error}`)
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <form
          className={styles.loginForm}
          onSubmit={submitHandler}
        >
          <h2>Login</h2>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input className={styles.input} type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input className={styles.input} type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <button className={styles.button} type="submit"
              disabled={isLoading}
            >Login</button>
          </div>
          <div className={`${styles.formGroup} ${styles.signupLink}`}>
            Already have an account? <Link to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;