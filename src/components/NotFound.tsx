import { Link } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import Header from './Header';

interface NotFoundProps {
  pageName: string;
}

export default function NotFound({ pageName }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 text-white font-worksans antialiased">
      <Header />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 bg-accent rounded-full flex items-center justify-center">
            <FiAlertCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-300">
            {pageName} Coming Soon
          </h2>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            We're crafting something extraordinary for this page. Our team is working with the same precision 
            and artistry that goes into every project. Check back soon to see what we're creating.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center bg-accent hover:bg-purple-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link 
              to="/#contact" 
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 rounded-md font-medium transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              In the meantime, explore our main site to learn more about our services and philosophy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
