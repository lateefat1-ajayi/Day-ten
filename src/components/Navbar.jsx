import { Link } from 'react-router-dom';



export default function Navbar() {
  return (
    <nav className="bg-amber-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">Dishcovery</Link>
        <div className="space-x-4 text-lg">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/recipes" className="hover:underline">Find Recipes</Link>
        </div>
      </div>
    </nav>
  );
}
