'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuthStore } from '@/lib/store/auth';
import { apiClient } from '@/lib/api/client';
import {
  ArrowLeft,
  Upload,
  Download,
  Play,
  Pause,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  Sun,
} from 'lucide-react';

// Dynamically import 3D viewer to avoid SSR issues
const Model3DViewer = dynamic(() => import('@/components/3d/Model3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="text-white">Loading 3D Viewer...</div>
    </div>
  ),
});

export default function ProjectEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    loadProject();
  }, [params.id, isAuthenticated]);

  const loadProject = async () => {
    try {
      const data = await apiClient.getProject(params.id as string);
      setProject(data);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Toolbar */}
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-gray-400">{project.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-gray-800 text-white p-4 space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-400">TOOLS</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Select
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Move
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Rotate
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Scale
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-400">VIEW</h3>
            <div className="space-y-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                  autoRotate ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <span>Auto Rotate</span>
                <RotateCw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                  showGrid ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <span>Show Grid</span>
                <Grid3x3 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-400">AI TOOLS</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                Generate Avatar
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                Image to 3D
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                Motion Capture
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                Prompt to Animation
              </button>
            </div>
          </div>
        </div>

        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <Model3DViewer autoRotate={autoRotate} showGrid={showGrid} />
          
          {/* Viewport Controls */}
          <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-2 space-y-2">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded text-white">
              <ZoomIn className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded text-white">
              <ZoomOut className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 rounded text-white">
              <Sun className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-gray-800 text-white p-4 space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-400">PROPERTIES</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400">Position X</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
                  defaultValue="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Position Y</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
                  defaultValue="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Position Z</label>
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
                  defaultValue="0"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-400">ASSETS</h3>
            <div className="text-sm text-gray-400">No assets yet</div>
          </div>
        </div>
      </div>
    </div>
  );
}
