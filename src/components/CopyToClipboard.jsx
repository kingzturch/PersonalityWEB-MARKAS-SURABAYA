import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const CopyToClipboard = ({ copyStatus, counter, resetCopyStatus }) => {
  const notificationRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (copyStatus && counter > 0) {
      gsap.to(notificationRef.current, { opacity: 1, duration: 0.5 });
      gsap.to(progressBarRef.current, { width: '100%', duration: 5, ease: 'linear' });
      const timer = setTimeout(() => {
        gsap.to(notificationRef.current, { opacity: 0, duration: 0.5, onComplete: resetCopyStatus });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus, counter, resetCopyStatus]);

  return (
    <>
      {copyStatus && counter > 0 && (
        <div
          ref={notificationRef}
          className={`w-full max-w-xs rounded-md px-4 py-2 ${
            copyStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white text-center fixed bottom-4 left-1/2 transform -translate-x-1/2`}
          style={{ opacity: 0 }}
        >
          {copyStatus === 'success' ? 'Link Berhasil dicopy!' : 'Gagal mengcopy link'}
          <div
            ref={progressBarRef}
            className="absolute bottom-0 left-0 h-1 bg-white"
            style={{ width: '0%' }}
          ></div>
        </div>
      )}
    </>
  );
};

CopyToClipboard.propTypes = {
  copyStatus: PropTypes.string,
  counter: PropTypes.number.isRequired,
  resetCopyStatus: PropTypes.func.isRequired,
};

export default CopyToClipboard;