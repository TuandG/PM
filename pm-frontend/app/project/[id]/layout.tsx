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
    <div className="flex flex-0 bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-background border-b border-border">
        <ProjectNav projectId={id} />
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
