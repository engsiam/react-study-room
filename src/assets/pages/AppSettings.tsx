
import React, { useEffect, useState } from "react";
// @ts-ignore: Suppress type error for missing declaration file
import AppNavigation from "../components/AppNavigation";
import { useNavigate } from "react-router-dom";
const AppSettings: React.FC = () => {
  const navigate = useNavigate();
  // Current time state
  const [currentTime, setCurrentTime] = useState<string>("");
  // Modal state
  const [showSignOutModal, setShowSignOutModal] = useState<boolean>(false);

  // Handle sign out
  const handleSignOut = () => {
    // Here you would implement actual sign out logic
    setShowSignOutModal(false);
    // For demo purposes, we'll just show an alert
    console.log("User signed out");
    // Redirect to login page or perform other sign out actions
    // window.location.href = "/login";
  };

  // Get current time for status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative bg-gray-50 text-gray-800 font-sans min-h-screen overflow-x-hidden">
      {/* Status Bar */}
      <div className="fixed top-0 w-full bg-white z-50 px-4 py-2 flex justify-between items-center shadow-sm">
        <div className="text-sm font-medium">{currentTime}</div>
        <div className="flex space-x-2">
          <i className="fas fa-wifi"></i>
          <i className="fas fa-battery-three-quarters"></i>
        </div>
      </div>
      {/* Header */}
      <div className="fixed top-10 w-full bg-white z-40 px-4 py-3 flex justify-between items-center shadow-sm">
      <span onClick={ ()=> navigate(-1 ) }
          className="text-gray-600 cursor-pointer"
        >
          <i className="fas fa-arrow-left text-lg"></i>
        </span>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-8"></div> {/* Empty div for balanced header */}
      </div>
      {/* Main Content */}
      <div className="pt-24 pb-20 px-4">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20adult%20with%20neutral%20expression%2C%20high%20quality%2C%20professional%20lighting%2C%20soft%20background%2C%20modern%20style%2C%20detailed%20facial%20features%2C%20natural%20colors&width=200&height=200&seq=1&orientation=squarish"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
              <i className="fas fa-camera text-white text-xs"></i>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="font-medium text-lg">Alexander Mitchell</h2>
            <p className="text-gray-500 text-sm">alex.mitchell@example.com</p>
            <button className="mt-2 text-blue-500 text-sm font-medium cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">Account Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-user-circle"></i>
                </div>
                <span className="ml-3 text-gray-700">Profile Information</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-key"></i>
                </div>
                <span className="ml-3 text-gray-700">Login Details</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <span className="ml-3 text-gray-700">Account Security</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-link"></i>
                </div>
                <span className="ml-3 text-gray-700">Linked Accounts</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>
        </div>
        {/* App Preferences */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">App Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <i className="fas fa-moon"></i>
                </div>
                <span className="ml-3 text-gray-700">Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <i className="fas fa-text-height"></i>
                </div>
                <span className="ml-3 text-gray-700">Font Size</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Medium</span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <i className="fas fa-th-large"></i>
                </div>
                <span className="ml-3 text-gray-700">Default View</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">List</span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <i className="fas fa-globe"></i>
                </div>
                <span className="ml-3 text-gray-700">Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">English</span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">Notification Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <i className="fas fa-bell"></i>
                </div>
                <span className="ml-3 text-gray-700">Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <i className="fas fa-envelope"></i>
                </div>
                <span className="ml-3 text-gray-700">Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <i className="fas fa-volume-up"></i>
                </div>
                <span className="ml-3 text-gray-700">Sound & Vibration</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <i className="fas fa-clock"></i>
                </div>
                <span className="ml-3 text-gray-700">
                  Custom Notification Times
                </span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>
        </div>
        {/* Data Management */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">Data Management</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <i className="fas fa-sync"></i>
                </div>
                <span className="ml-3 text-gray-700">Backup & Sync</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">On</span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <i className="fas fa-database"></i>
                </div>
                <span className="ml-3 text-gray-700">Storage Usage</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">128 MB</span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <i className="fas fa-file-export"></i>
                </div>
                <span className="ml-3 text-gray-700">Export Data</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <i className="fas fa-broom"></i>
                </div>
                <span className="ml-3 text-gray-700">Clear Cache</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">24 MB</span>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Privacy & Security */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">Privacy & Security</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <i className="fas fa-user-shield"></i>
                </div>
                <span className="ml-3 text-gray-700">Privacy Settings</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <i className="fas fa-lock"></i>
                </div>
                <span className="ml-3 text-gray-700">Change Password</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <i className="fas fa-fingerprint"></i>
                </div>
                <span className="ml-3 text-gray-700">
                  Two-Factor Authentication
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <span className="ml-3 text-gray-700">App Lock</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
        {/* Help & Support */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="text-lg font-medium mb-3">Help & Support</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-question-circle"></i>
                </div>
                <span className="ml-3 text-gray-700">FAQ</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-headset"></i>
                </div>
                <span className="ml-3 text-gray-700">Contact Support</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-file-contract"></i>
                </div>
                <span className="ml-3 text-gray-700">Terms of Service</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
            <div className="border-t border-gray-100"></div>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <i className="fas fa-user-secret"></i>
                </div>
                <span className="ml-3 text-gray-700">Privacy Policy</span>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>
        </div>
        {/* Sign Out Button */}
        <button
          id="signOutButton"
          onClick={() => setShowSignOutModal(true)}
          className="w-full bg-white text-red-500 font-medium py-3 rounded-xl shadow-sm mb-6 cursor-pointer !rounded-button"
        >
          Sign Out
        </button>

        {/* Sign Out Confirmation Modal */}
        {showSignOutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-5 w-full max-w-xs">
              <h3 className="text-lg font-medium mb-3 text-center">Sign Out</h3>
              <p className="text-gray-600 text-center mb-5">
                Are you sure you want to sign out?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSignOutModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg font-medium !rounded-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg font-medium !rounded-button"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
        {/* App Version */}
        <div className="text-center text-gray-400 text-sm mb-6">
          <p>Study Notes App v2.4.1</p>
          <p className="mt-1">© 2025 StudyNotes Inc. All rights reserved.</p>
        </div>
      </div>
      {/* Bottom Navigation */}
      <AppNavigation/>
    </div>
  );
};
export default AppSettings;
