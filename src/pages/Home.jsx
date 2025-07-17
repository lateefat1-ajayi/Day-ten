import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="bg-gradient-to-b from-amber-100 to-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-amber-600">Welcome to Dishcovery</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Discover new flavors, find delicious recipes, and satisfy your cravings.
        </p>
        <Link to="/recipes" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-lg shadow-lg transition">
          Get Started🙂
        </Link>
      </div>
    </section>
  );
}
