import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Users, Plus, UserPlus, Trophy, Calendar, MessageCircle } from 'lucide-react';
import CreateGroupModal from './CreateGroupModal';
import JoinGroupModal from './JoinGroupModal';

export default function StudyGroupsView() {
  const { state } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Groups</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Learn together with friends and track progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowJoinModal(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join Group</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Community Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-300">
              Join Our WhatsApp Community
            </h3>
          </div>
          <p className="text-green-700 dark:text-green-400 mb-6 max-w-2xl mx-auto">
            Connect with fellow DSA enthusiasts, share solutions, get help, and stay motivated together in our active community!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://chat.whatsapp.com/IJw256xuepP956JsufMY6g"
              target="_blank"
              rel="noopener noreferrer"
              title="Join our Study Group"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Join Study Group</span>
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb5Znw9LdQeVRFBK8Q2s"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow our WhatsApp Channel"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp Channel</span>
            </a>
          </div>
          <div className="mt-4 text-sm text-green-600 dark:text-green-400">
            <p>💡 Get daily tips • 🤝 Find study partners • 🏆 Join challenges • 📚 Share resources</p>
          </div>
        </div>
      </div>
      {/* Study Groups List */}
      {state.studyGroups.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No study groups yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create or join a study group to learn with friends and track progress together
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Group</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.studyGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {group.members.length} members
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  group.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {group.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {group.description}
              </p>

              {/* Members */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Top Members
                </h4>
                <div className="space-y-2">
                  {group.members.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {member.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-gray-500">
                          {member.tasksCompleted}
                        </span>
                      </div>
                    </div>
                  ))}
                  {group.members.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      +{group.members.length - 3} more members
                    </p>
                  )}
                </div>
              </div>

              {/* Group Stats */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <JoinGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </div>
  );
}