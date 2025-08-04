const ErrorBoundary = () => (
  <div
    className={`
      flex min-h-screen flex-col items-center justify-center bg-ocean-50
    `}
  >
    <div
      className={`
        rounded-2xl border border-hit-200 bg-white/90 p-8 text-center shadow-2xl
      `}
    >
      <span className='mb-4 text-6xl'>⚠️</span>
      <h1 className='mb-4 text-3xl font-bold text-hit-500'>Oops! Something went wrong</h1>
      <p className='mb-6 text-ocean-600'>
        The battleship encountered rough seas. Please try again.
      </p>
      <button
        className={`
          rounded-lg bg-ocean-500 px-6 py-3 font-semibold text-white
          transition-colors
          hover:bg-ocean-600
        `}
        onClick={() => {
          window.location.reload();
        }}
      >
        🔄 Reload Game
      </button>
    </div>
  </div>
);

export default ErrorBoundary;
