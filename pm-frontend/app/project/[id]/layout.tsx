`use client`
import { use } from "react";
import { ProjectNav } from "@/components/project-nav"

interface ProjectLayoutProps {
  children: React.ReactNode
  params: { id: string }
}

export default function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const resolvedParams = use(Promise.resolve(params));
  const { id } = resolvedParams as { id: string };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col">
        <div className="sticky top-0 z-50 bg-background border-b border-border">
          <ProjectNav projectId={id} />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
