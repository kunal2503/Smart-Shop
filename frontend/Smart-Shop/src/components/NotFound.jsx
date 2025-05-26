import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to={"/"} style={styles.button}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: '6rem',
    color: '#343a40',
    marginBottom: '20px'
  },
  message: {
    fontSize: '1.5rem',
    color: '#6c757d',
    marginBottom: '30px'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  }
};

export default NotFound;
