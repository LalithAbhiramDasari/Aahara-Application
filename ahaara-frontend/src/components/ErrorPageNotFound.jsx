import { Link } from "react-router-dom";
import ErrorImage from "../assets/ErrorPageImage.png";
 
const ErrorPageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-center">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto">
        <h1 className="text-8xl font-extrabold text-red-700 drop-shadow-lg">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mt-4">Page Not Found!</h2>
        <p className="text-lg text-gray-700 mt-2 italic">
          Something went wrong. The page you are looking for is not available.
        </p>
 
        {/* Car Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={ErrorImage}
            alt="Broken Car"
            className="w-90 h-auto rounded-lg shadow-xl  border-gray-300"
          />
        </div>
 
        <p className="text-lg text-gray-700 mt-6 italic">
          {/* "Even the best drivers take a wrong turn sometimes!" */}
        </p>
 
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-[#08426a] text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition shadow-lg"
        >
          🏠 Take Me Home
        </Link>
      </div>
    </div>
  );
};
 
export default ErrorPageNotFound;
 