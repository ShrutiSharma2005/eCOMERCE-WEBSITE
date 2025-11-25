import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                maxWidth: '600px',
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem'
                }}>⚠️</div>

                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '1rem'
                }}>
                    Oops! Something went wrong
                </h1>

                <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    We encountered an unexpected error. Don't worry, our team has been notified.
                </p>

                {error && (
                    <details style={{
                        marginBottom: '2rem',
                        textAlign: 'left',
                        backgroundColor: '#f8f9fa',
                        padding: '1rem',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}>
                        <summary style={{
                            fontWeight: '600',
                            color: '#495057',
                            marginBottom: '0.5rem'
                        }}>
                            Error Details
                        </summary>
                        <pre style={{
                            fontSize: '0.875rem',
                            color: '#dc3545',
                            overflow: 'auto',
                            margin: '0.5rem 0 0 0',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
                            {error.message || error.statusText || 'Unknown error'}
                        </pre>
                    </details>
                )}

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={handleReload}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'white',
                            backgroundColor: '#007bff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                        Reload Page
                    </button>

                    <button
                        onClick={handleGoHome}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#007bff',
                            backgroundColor: 'white',
                            border: '2px solid #007bff',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'white';
                        }}
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary;
