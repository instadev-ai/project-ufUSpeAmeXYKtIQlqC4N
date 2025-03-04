
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Twitter, Home } from "lucide-react";

interface DocHeaderProps {
  activeTab?: string;
}

const DocHeader: React.FC<DocHeaderProps> = ({ activeTab = "docs" }) => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center mr-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">D</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">DocsFlow</span>
        </Link>
      </div>
      <Tabs defaultValue={activeTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="docs" asChild>
              <Link to="/docs">Documentation</Link>
            </TabsTrigger>
            <TabsTrigger value="api" asChild>
              <Link to="/api">API</Link>
            </TabsTrigger>
            <TabsTrigger value="examples" asChild>
              <Link to="/examples">Examples</Link>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Home" asChild>
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
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
