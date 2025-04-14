'use client';

import React from 'react';

export default function TestSection() {
  console.log('TestSection is rendering');
  
  return (
    <div 
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: 'white',
        position: 'relative',
        zIndex: 50
      }}
    >
      THIS IS A TEST SECTION
    </div>
  );
} 