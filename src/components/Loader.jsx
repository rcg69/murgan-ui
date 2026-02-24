'use client';

import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Hide loader after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}>
        <div className={styles.spinnerCircle}></div>
        <div className={styles.spinnerCircle}></div>
        <div className={styles.spinnerCircle}></div>
      </div>
      <p className={styles.loaderText}>Loading...</p>
    </div>
  );
}
