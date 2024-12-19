'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { theme } from '@/lib/themes';
import { ArrowRight, FileText, Wand2, Clock, Layout } from 'lucide-react';
import { useEffect, useState } from 'react';

// Sample templates data
// const sampleTemplates = [
//   { id: 'professional', name: 'Professional', image: '/templates/professional.png' },
//   { id: 'modern', name: 'Modern', image: '/templates/modern.png' },
//   { id: 'creative', name: 'Creative', image: '/templates/creative.png' },
//   { id: 'academic', name: 'Academic', image: '/templates/academic.png' },
// ];
interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  filename: string;
}
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
// Features data
const features = [
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'AI-Powered Content',
    description: 'Let our AI help you craft the perfect resume with professional content suggestions.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Multiple Templates',
    description: 'Choose from a variety of professionally designed templates to match your style.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Quick Generation',
    description: 'Create your resume in minutes with our streamlined process.',
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'Real-time Preview',
    description: 'See changes instantly with our live preview feature.',
  },
];

export default function Home() {
  const [sampleTemplates,setSampleTemplates] = useState<Template[]>();
  useEffect(() => {

    // Fetch templates from the server
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(BASE_URL+'/api/resume/templates');
      const data = await response.json();
      if (data.success) {
        setSampleTemplates(data.templates);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } 
  };
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-[1200px] text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
            Create Your Perfect Resume with AI
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Build professional resumes in minutes using AI-powered content generation
            and beautiful templates.
          </p>
          <Link href="/create" className="inline-block">
            <Button
              size="lg"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2"
            >
              Create Resume <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#1e293b]">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Resume Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-[#0f172a] border border-gray-800 hover:border-sky-500 transition-all"
              >
                <div className="text-sky-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleTemplates?.map((template) => (
              <div
                key={template.id}
                className="group relative rounded-lg overflow-hidden bg-[#1e293b] hover:shadow-xl transition-all"
              >
                <img
                  src={BASE_URL+ template.preview}
                  alt={template.name}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                    <Link href="/create" className="text-sky-400 hover:text-sky-300">
                      Use Template →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
