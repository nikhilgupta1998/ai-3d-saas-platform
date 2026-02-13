'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { useProjectsStore } from '@/lib/store/projects';
import { apiClient } from '@/lib/api/client';
import { Cube, Plus, Settings, LogOut, CreditCard } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { projects, setProjects } = useProjectsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    loadProjects();
  }, [isAuthenticated]);

  const loadProjects = async () => {
    try {
      const data = await apiClient.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    apiClient.logout();
    router.push('/');
  };

  const handleCreateProject = async () => {
    try {
      const project = await apiClient.createProject('New Project');
      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Cube className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI 3D Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{user?.credits || 0}</span> credits
              </div>
              <button
                onClick={() => router.push('/settings')}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start creating amazing 3D content with AI
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <QuickActionCard
            title="New Project"
            description="Start a new 3D project"
            icon={<Plus className="h-6 w-6" />}
            onClick={handleCreateProject}
          />
          <QuickActionCard
            title="AI Avatar"
            description="Generate AI avatar"
            icon={<Cube className="h-6 w-6" />}
            onClick={() => router.push('/dashboard/avatar')}
          />
          <QuickActionCard
            title="Image to 3D"
            description="Convert image to 3D"
            icon={<Cube className="h-6 w-6" />}
            onClick={() => router.push('/dashboard/image-to-3d')}
          />
          <QuickActionCard
            title="Motion Capture"
            description="Capture motion from video"
            icon={<Cube className="h-6 w-6" />}
            onClick={() => router.push('/dashboard/motion-capture')}
          />
        </div>

        {/* Projects Grid */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Projects
          </h3>
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <Cube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects yet
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first project to get started
              </p>
              <button
                onClick={handleCreateProject}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-4"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-3 flex items-center justify-center">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <Cube className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {project.name}
                  </h4>
                  {project.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {project.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-left"
    >
      <div className="text-blue-600 mb-3">{icon}</div>
      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </button>
  );
}
