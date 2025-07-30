
function Main404() {

  return (
    <main className="flex-grow flex items-center justify-center dark:bg-transparent dark:text-white bg-white text-black">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-6xl font-bold mb-4 animate-pulse">404</h1>
        <p className="text-2xl mb-6">Oops! Page Not Found</p>
        <p className="mb-6">It seems you've wandered into uncharted territory. The page you're looking for might have been moved, deleted, or never existed.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#625a50]  hover:bg-[#45403b] dark:bg-[#817565] dark:hover:bg-[#625a50] text-white rounded-lg transition duration-300"
        >
          Back to Home
        </a>
        <div className="mt-8">
          <svg
            className="w-32 h-32 mx-auto text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
            ></path>
          </svg>
        </div>
      </div>
    </main>
  );
}

export default Main404;