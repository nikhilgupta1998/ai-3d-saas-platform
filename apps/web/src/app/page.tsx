import Link from 'next/link';
import { ArrowRight, Cube, Sparkles, Video, Download } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Cube className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">AI 3D Platform</span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Amazing 3D Models with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your ideas into professional 3D models, animations, and avatars using
            cutting-edge AI technology. Export to Blender and beyond.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-blue-600" />}
            title="AI Avatar Creation"
            description="Generate custom 3D avatars from text descriptions with automatic rigging"
          />
          <FeatureCard
            icon={<Cube className="h-8 w-8 text-blue-600" />}
            title="Image to 3D"
            description="Convert any 2D image into a fully textured 3D model instantly"
          />
          <FeatureCard
            icon={<Video className="h-8 w-8 text-blue-600" />}
            title="Motion Capture"
            description="Extract animations from video and apply to your 3D models"
          />
          <FeatureCard
            icon={<Download className="h-8 w-8 text-blue-600" />}
            title="Blender Export"
            description="Export in multiple formats including .blend, .glb, and .fbx"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to bring your ideas to life?</h2>
          <p className="text-xl mb-8">Start creating professional 3D content today</p>
          <Link
            href="/auth/register"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
