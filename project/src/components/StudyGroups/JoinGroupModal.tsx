import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, UserPlus, Search } from 'lucide-react';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinGroupModal({ isOpen, onClose }: JoinGroupModalProps) {
  const { joinStudyGroup, state } = useApp();
  const [groupCode, setGroupCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupCode.trim()) return;

    // In a real app, this would search for groups by code
    // For demo purposes, we'll just show a message
    alert('Group joining feature would connect to a backend service');
    onClose();
  };

  const availableGroups = [
    { id: '1', name: 'Algorithm Masters', members: 15, description: 'Advanced algorithms and competitive programming' },
    { id: '2', name: 'Data Structure Basics', members: 8, description: 'Learning fundamentals together' },
    { id: '3', name: 'Interview Prep Squad', members: 12, description: 'Preparing for technical interviews' },
    { id: '4', name: 'Dynamic Programming Club', members: 6, description: 'Mastering DP problems step by step' }
  ];

  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Join Study Group
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Join by Code */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Join with Group Code
            </h3>
            <form onSubmit={handleJoinByCode} className="flex space-x-2">
              <input
                type="text"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter group code..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Browse Public Groups
            </h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Search groups..."
              />
            </div>

            {/* Groups List */}
            <div className="space-y-3">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {group.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {group.members} members
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        joinStudyGroup(group.id, { name: state.settings.username });
                        alert(`Joined ${group.name}!`);
                        onClose();
                      }}
                      className="ml-4 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No groups found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}