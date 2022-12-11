import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { registerUser } from '../redux/features/auth/authSlice';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerOk, setRegisterOk] = useState(false);
  const status = useSelector((state) => state.auth.status);
  // const isAuth = useSelector(checkAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: {
      errors, isValid,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (registerOk) {
      navigate('/login');
    }
  }, [status, registerOk, navigate]);

  const handleSubmitReg = () => {
    try {
      dispatch(registerUser({ username, password }));
      setRegisterOk(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/4 h-60 mx-auto mt-40 flex flex-col justify-center items-center">
      <h1 className="titlePage">Registration</h1>
      <form onSubmit={handleSubmit(() => {
        handleSubmitReg();
      })}>
        <section className="mb-5">
          <input
            type="text"
            {...register('username', {
              required: 'required field',
              minLength: {
                value: 5,
                message: 'min 5 characters',
              },
              maxLength: {
                value: 20,
                message: 'max 20 characters',
              },
            })}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="inputPage mt-5"
          ></input>
          <div className='errorInput'>{errors?.username && <span>{errors?.username?.message || 'Error!'}</span>}</div>
        </section>
        <section>
          <input
            type="password"
            {...register('password', {
              required: 'required field',
              minLength: {
                value: 8,
                message: 'min 8 characters',
              },
              maxLength: {
                value: 24,
                message: 'max 20 characters',
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            className="inputPage"
          ></input>
          <div className='errorInput'>{errors?.password && <span>{errors?.password?.message || 'Error!'}</span>}</div>
        </section>
        <div className="flex flex-col gap-8 justify-center items-center mt-5">
          <button
            type="submit"
            disabled={!isValid}
            className="btnPage"
          >
            CONFIRM
          </button>
          <Link
            to="/login"
            className="flex justify-center items-center text-xs text-slate-300 hover:text-[#d55f34]"
          >
            have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
