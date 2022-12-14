/* eslint-disable import/no-unresolved */
import React from 'react';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto">
      <div className='flex justify-center items-center pt-5 pb-5'>
        <h1 className='text-slate-300 font-black text-4xl'>POST MAKER</h1>
      </div>
        <NavBar />
        {children}
      </div>
    </>
  );
}
