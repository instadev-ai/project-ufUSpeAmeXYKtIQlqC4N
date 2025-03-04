
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <TabsTrigger value="examples" asChild>
              <Link to="/examples">Examples</Link>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="GitHub" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#feedback">Feedback</a>
            </Button>
            <Button size="sm" asChild>
              <a href="#get-started">Get Started</a>
            </Button>
          </div>
        </div>
      </Tabs>
    </header>
  );
};

export default DocHeader;
