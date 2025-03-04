
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Twitter } from "lucide-react";

interface DocHeaderProps {
  activeTab?: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({ activeTab = "docs" }) => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Tabs defaultValue={activeTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="docs" asChild>
              <Link to="/">Documentation</Link>
            </TabsTrigger>
            <TabsTrigger value="api" asChild>
              <Link to="/api">API</Link>
            </TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">Feedback</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </Tabs>
    </header>
  );
};

export default DocHeader;
