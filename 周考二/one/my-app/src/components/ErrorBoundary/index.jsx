import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    useEffect(()=>{
        const handleError = (error,errorInfo) => {
            setHasError(true);
            console.log(error,errorInfo);
        }
        const handleErrorEvent = (event) => {
            handleError(event.error,event.errorInfo);
        }
        window.addEventListener('error',handleErrorEvent);
        return () => {
            window.removeEventListener('error',handleErrorEvent);
        }
    },[]);
    if(hasError){
        return <div>Something went wrong.</div>;
    }
    return children;
};

export default ErrorBoundary;
