import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type SignInFormData = z.infer<typeof signInSchema>;

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [signInError, setSignInError] = useState('');
  const { user, signIn, signOut } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      setIsSignInModalOpen(false);
      reset();
      setSignInError('');
    } catch (error) {
      setSignInError('Invalid email or password');
    }
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-2xl text-blue-400 hover:text-blue-300 transition-colors">
            MyNeighbourHub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/businesses" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Businesses
            </Link>
            <Link to="/events" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Events
            </Link>
            <Link to="/complaints" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Complaints
            </Link>
            <Link to="/announcements" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Announcements
            </Link>
            <Link to="/ladies-corner" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Ladies' Corner
            </Link>
            <Link to="/help-threads" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Help Threads
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">{user.name}</span>
                  <button
                    onClick={signOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSignInModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/businesses"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Businesses
            </Link>
            <Link
              to="/events"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Events
            </Link>
            <Link
              to="/complaints"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Complaints
            </Link>
            <Link
              to="/announcements"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Announcements
            </Link>
            <Link
              to="/ladies-corner"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Ladies' Corner
            </Link>
            <Link
              to="/help-threads"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Help Threads
            </Link>
            <div className="px-4 py-2 flex items-center justify-between">
              <button className="relative text-gray-300 hover:text-white">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">{user.name}</span>
                  <button
                    onClick={signOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSignInModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {signInError && (
                <p className="text-red-400 text-sm">{signInError}</p>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-300 hover:text-white font-medium"
                  onClick={() => {
                    setIsSignInModalOpen(false);
                    reset();
                    setSignInError('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <p>Demo credentials:</p>
                <p>Email: demo@example.com</p>
                <p>Password: password</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;