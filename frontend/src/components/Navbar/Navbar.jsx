import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Home,
  CheckSquare,
  Calendar,
  FileText,
  Users,
  BarChart3
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "#" },
    // { label: "Tasks", icon: <CheckSquare className="w-5 h-5" />, href: "#", active: true },
    // { label: "Calendar", icon: <Calendar className="w-5 h-5" />, href: "#" },
    { label: "Documents", icon: <FileText className="w-5 h-5" />, href: "#" },
    // { label: "Team", icon: <Users className="w-5 h-5" />, href: "#" },
    { label: "Analytics", icon: <BarChart3 className="w-5 h-5" />, href: "#" },
  ];

  const profileItems = [
    { label: "My Profile", icon: <User className="w-4 h-4" />, href: "#" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, href: "#" },
    { label: "Sign Out", icon: <LogOut className="w-4 h-4" />, href: "#" },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-white/80 backdrop-blur-sm border-b border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Task Manager
                  </h1>
                  <p className="text-gray-600 text-xs hidden sm:block">Manage your tasks efficiently</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    item.active
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                />
              </div>

              {/* Mobile Search Button */}
              <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">JD</span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@example.com</p>
                    </div>
                    <div className="py-2">
                      {profileItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    item.active
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
              
              {/* Mobile Search */}
              <div className="px-4 py-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Close dropdowns when clicking outside */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
}