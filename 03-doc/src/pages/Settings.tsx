import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Lock, User } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Profile Section */}
        <div className="p-6">
          <div className="flex items-center">
            <User className="h-6 w-6 text-gray-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">
              Profile Settings
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-gray-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">
              Notification Preferences
            </h2>
          </div>
          <div className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email_notifications"
                    name="email_notifications"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="email_notifications"
                    className="font-medium text-gray-700"
                  >
                    Email notifications
                  </label>
                  <p className="text-gray-500">
                    Receive email notifications for document updates and expiry
                    reminders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6">
          <div className="flex items-center">
            <Lock className="h-6 w-6 text-gray-400" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Security</h2>
          </div>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}