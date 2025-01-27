import './preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <div className="logo">
        <h1>MARKAS</h1>
      </div>
      <div className="loading-symbol">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Preloader;