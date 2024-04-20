import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import styles from '../css/login.module.css'
import Navbar from '../components/Navbar';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/browse');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      alert('Login successful');
      dispatch(setCredentials({ ...res }));
      navigate('/browse');
    } catch (err) {
      alert(`Failed to login: ${err?.data?.message || err.error}`)
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
        </form>

        <div className={`${styles.formGroup} ${styles.signupLink}`}>
          Dont have an account? <Link to='/register'>Register</Link>
        </div>

      </div>
    </main>
  );
};

export default LoginScreen;
