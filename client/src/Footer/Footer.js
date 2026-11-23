import { Link } from 'react-router-dom';
import { HiShieldCheck, HiSparkles, HiPhone, HiMail } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                S
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Servicely</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted on-demand home service partner. Discover skilled, background-verified professionals for repairs, installations, and beauty right at your doorstep.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-400 font-medium">
              <HiShieldCheck className="w-5 h-5" />
              <span>100% Verified Service Professionals</span>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Popular Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/service/Home Repairs?home" className="hover:text-blue-400 transition-colors">
                  Electrician & Plumbing
                </Link>
              </li>
              <li>
                <Link to="/service/Home Repairs?ac" className="hover:text-blue-400 transition-colors">
                  Air Conditioner (AC) Repair
                </Link>
              </li>
              <li>
                <Link to="/service/Cleaning?deep" className="hover:text-blue-400 transition-colors">
                  Deep Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/service/Designing?interior" className="hover:text-blue-400 transition-colors">
                  Interior & Carpentry
                </Link>
              </li>
              <li>
                <Link to="/service/Beauty?salon" className="hover:text-blue-400 transition-colors">
                  Salon & Beauty at Home
                </Link>
              </li>
            </ul>
          </div>

          {/* For Service Partners */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              For Professionals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium">
                  <HiSparkles className="w-4 h-4" />
                  <span>Register as Service Partner</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Partner Portal Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Partner Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Customer Support
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <HiMail className="w-4 h-4 text-blue-400" />
                <span>support@servicely.com</span>
              </li>
              <li className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-blue-400" />
                <span>+91 (800) 123-4567</span>
              </li>
              <li className="text-xs text-slate-500 pt-2">
                Mon - Sun: 8:00 AM - 9:00 PM IST
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Servicely Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-slate-400 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
