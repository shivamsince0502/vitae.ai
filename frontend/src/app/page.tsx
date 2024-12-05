"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateResumeModal } from "@/components/modals/CreateResumeModal";
import Link from "next/link";
import { ResumeForm } from '@/components/resume-form/ResumeForm';
import { LatexEditor } from '@/components/editor/LatexEditor';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create ATS-Optimized Resumes with AI
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Transform your career with our AI-powered LaTeX resume builder. 
            Create professional, ATS-friendly resumes that stand out.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => setShowModal(true)}>
              Create Resume
            </Button>
            <Button variant="outline" size="lg">
              View Templates
            </Button>
          </div>
        </div>
      </section>
      
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to create a professional resume
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Let AI help you write professional content and optimize for ATS
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">LaTeX Editor</h3>
                <p className="text-sm text-muted-foreground">
                  Professional typesetting with real-time preview
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Multiple Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from various professional LaTeX templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CreateResumeModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}
