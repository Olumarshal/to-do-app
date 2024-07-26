import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import {  useNavigate } from 'react-router-dom';

const initialState = {
  username: '',
  email: '',
  password: '',
  isMember: true,
};

function Signup() {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  
  const onSubmit = async(e) => {
    try {
      e.preventDefault();
      const { username, email, password, isMember } = values;
      if (!email || !password || (!isMember && !username)) {
        toast.error('Please fill out all fields');
        return;
      }
      if (isMember) {
        dispatch(loginUser({ email: email, password: password }));
        return;
      }
      const newUser = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!newUser.ok) {
        const errorData = await newUser.json();
        toast.error(errorData.message || 'Registration failed');
        return;
      }

      const userData = await newUser.json();
      console.log(userData)
      dispatch(registerUser({ username, email, password }));
    } catch(error) {
      console.log(error);
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [navigate, user]);
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Signup'}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='username'
            value={values.username}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }
        >
          {/* {isLoading ? 'loading...' : 'demo app'} */}
        </button>
        <p>
          {values.isMember ? 'Not yet registered?' : 'Already registered?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Signup;
