import React, { useState } from 'react';


export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://10.4.9.253:8002/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Redirecting...' });
        setTimeout(() => {
          if (onSwitchToLogin) onSwitchToLogin();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed!' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage({ type: 'error', text: 'Server connection error!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardSub}>ACCOUNT CREATION</span>
          <h2 style={styles.cardTitle}>Create New Account</h2>
          <p style={styles.desc}>Register to access Equipment Track Management System.</p>
        </div>

        {message.text && (
          <div
            style={{
              ...styles.alert,
              backgroundColor: message.type === 'error' ? '#fef2f2' : '#f0fdf4',
              color: message.type === 'error' ? '#991b1b' : '#166534',
              borderColor: message.type === 'error' ? '#fca5a5' : '#86efac'
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. john_doe"
              required
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              required
              style={styles.input}
            />
          </div>

          {/* Passwords Row */}
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type='text'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  style={{ ...styles.input, paddingRight: '50px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleBtn}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                style={styles.input}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Registering...' : 'Register Account'}
          </button>

          {/* Switch to Login */}
          <div style={styles.footer}>
            <span style={styles.footerText}>Already have an account?</span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={styles.linkBtn}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '24px'
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  cardHeader: {
    marginBottom: '20px'
  },
  cardSub: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#888',
    letterSpacing: '0.5px'
  },
  cardTitle: {
    fontSize: '22px',
    margin: '4px 0',
    color: '#111827'
  },
  desc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  alert: {
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    border: '1px solid',
    marginBottom: '16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    backgroundColor: '#fff',
    width: '100%',
    boxSizing: 'border-box'
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  toggleBtn: {
    position: 'absolute',
    right: '8px',
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    marginTop: '12px',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '14px'
  },
  footerText: {
    fontSize: '12px',
    color: '#6b7280'
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer'
  }
};