import { Link } from 'react-router-dom';

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        {/* Small accent dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white dark:border-gray-800"></div>
      </div>
      
      {/* Logo Text */}
      <span className="text-2xl font-bold bg-gradient-to-r from-orange-800 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
        Dishcovery
      </span>
    </Link>
  );
}
