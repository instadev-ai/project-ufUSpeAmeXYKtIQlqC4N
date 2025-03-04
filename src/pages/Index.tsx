
import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import DocHeader from "@/components/DocHeader";
import DocContent, { DocHeading, DocParagraph, DocAlert, DocCode, DocCard } from "@/components/DocContent";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Documentation sections
const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", id: "introduction", content: "Welcome to our documentation! This guide will help you get started with our platform." },
      { title: "Quick Start", id: "quick-start", content: "Follow these steps to quickly set up your first project." },
      { title: "Installation", id: "installation", content: "Learn how to install our software on different platforms." }
    ]
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Architecture", id: "architecture", content: "Understand the architecture behind our platform." },
      { title: "Data Model", id: "data-model", content: "Learn about our data model and how it's structured." },
      { title: "Authentication", id: "authentication", content: "Implement authentication in your applications." }
    ]
  },
  {
    title: "Guides",
    items: [
      { title: "User Management", id: "user-management", content: "Learn how to manage users in your application." },
      { title: "API Integration", id: "api-integration", content: "Integrate with our API for extended functionality." },
      { title: "Deployment", id: "deployment", content: "Deploy your application to production environments." }
    ]
  },
  {
    title: "API Reference",
    items: [
      { title: "Endpoints", id: "endpoints", content: "Explore all available API endpoints." },
      { title: "Parameters", id: "parameters", content: "Learn about the parameters for each endpoint." },
      { title: "Responses", id: "responses", content: "Understand the structure of API responses." }
    ]
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [activeItem, setActiveItem] = useState(sections[0].items[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const searchInputRef = useRef(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setActiveItem(section.items[0]);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Update URL with the item ID (without hash)
    window.history.pushState({}, "", `/${item.id}`);
  };

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setSelectedResultIndex(0);
      return;
    }
    
    // Search through all sections and items
    const results = [];
    sections.forEach(section => {
      section.items.forEach(item => {
        if (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            section: section.title,
            item
          });
        }
      });
    });
    
    setSearchResults(results);
    setSelectedResultIndex(0); // Reset selection when results change
  };

  // Handle keyboard navigation in search results
  const handleSearchKeyDown = (e) => {
    if (searchResults.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResultIndex(prev => 
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    }
    
    // Arrow up
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResultIndex(prev => prev > 0 ? prev - 1 : 0);
    }
    
    // Enter key - select the highlighted result
    if (e.key === 'Enter' && selectedResultIndex >= 0 && selectedResultIndex < searchResults.length) {
      e.preventDefault();
      const result = searchResults[selectedResultIndex];
      const section = sections.find(s => s.title === result.section);
      if (section) {
        handleSectionClick(section);
        handleItemClick(result.item);
        setIsSearchOpen(false);
      }
    }
    
    // Escape key - close the search dialog
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus search input when dialog opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle URL path on initial load
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, ""); // Remove leading slash
    if (path) {
      // Find the item with the matching ID
      for (const section of sections) {
        const item = section.items.find(item => item.id === path);
        if (item) {
          setActiveSection(section);
          setActiveItem(item);
          break;
        }
      }
    }
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader>
            <div className="flex items-center px-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="font-bold text-lg">Docs</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onClick={() => setIsSearchOpen(true)}
              />
              <div className="absolute right-3 top-2 text-xs text-gray-500">
                <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md">⌘K</kbd>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2">
            {sections.map((section) => (
              <div key={section.title} className="mb-4">
                <h3 className="px-4 text-sm font-medium text-gray-500 mb-1">{section.title}</h3>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeItem.id === item.id}
                        onClick={() => {
                          handleSectionClick(section);
                          handleItemClick(item);
                        }}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
            ))}
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <DocHeader activeTab="docs" />
          
          <main className="flex-1 overflow-auto p-6 sm:p-10">
            <DocContent>
              <div className="max-w-5xl mx-auto">
                <DocHeading level={1} id={activeItem.id}>{activeItem.title}</DocHeading>
                <DocParagraph>{activeItem.content}</DocParagraph>
                
                {activeItem.id === "introduction" && (
                  <>
                    <DocAlert type="info">
                      This documentation will help you understand how to use our platform effectively.
                    </DocAlert>
                    
                    <DocHeading level={2} id="what-is-it">What is our platform?</DocHeading>
                    <DocParagraph>
                      Our platform is a comprehensive solution for building modern applications.
                      It provides tools and services to help developers create, deploy, and manage
                      applications with ease.
                    </DocParagraph>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                      <DocCard>
                        <DocHeading level={3}>Easy to use</DocHeading>
                        <DocParagraph>
                          Our intuitive interface makes it simple to get started and build your first application.
                        </DocParagraph>
                      </DocCard>
                      
                      <DocCard>
                        <DocHeading level={3}>Powerful features</DocHeading>
                        <DocParagraph>
                          Access advanced capabilities through our comprehensive API and integrations.
                        </DocParagraph>
                      </DocCard>
                      
                      <DocCard>
                        <DocHeading level={3}>Scalable</DocHeading>
                        <DocParagraph>
                          Built to grow with your needs, from small projects to enterprise applications.
                        </DocParagraph>
                      </DocCard>
                      
                      <DocCard>
                        <DocHeading level={3}>Secure</DocHeading>
                        <DocParagraph>
                          Enterprise-grade security to protect your data and applications.
                        </DocParagraph>
                      </DocCard>
                    </div>
                    
                    <DocHeading level={2} id="getting-started">Getting Started</DocHeading>
                    <DocParagraph>
                      To get started with our platform, you'll need to:
                    </DocParagraph>
                    
                    <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
                      <li>Create an account on our platform</li>
                      <li>Set up your first project</li>
                      <li>Install the necessary dependencies</li>
                      <li>Start building your application</li>
                    </ol>
                    
                    <DocHeading level={2} id="installation">Installation</DocHeading>
                    <DocParagraph>
                      You can install our SDK using npm or yarn:
                    </DocParagraph>
                    
                    <DocCode code="npm install @platform/sdk" language="bash" />
                    <DocCode code="yarn add @platform/sdk" language="bash" />
                    
                    <DocHeading level={2} id="usage">Basic Usage</DocHeading>
                    <DocParagraph>
                      Here's a simple example of how to use our SDK:
                    </DocParagraph>
                    
                    <DocCode 
                      code={`import { Client } from '@platform/sdk';

// Initialize the client
const client = new Client({
  apiKey: 'your-api-key'
});

// Use the client to interact with our API
async function getUsers() {
  const users = await client.users.list();
  console.log(users);
}

getUsers();`} 
                      language="javascript" 
                    />
                  </>
                )}
                
                {activeItem.id === "quick-start" && (
                  <>
                    <DocAlert type="success">
                      Follow this quick start guide to get up and running in minutes!
                    </DocAlert>
                    
                    <DocHeading level={2} id="prerequisites">Prerequisites</DocHeading>
                    <DocParagraph>
                      Before you begin, make sure you have the following installed:
                    </DocParagraph>
                    
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                      <li>Node.js (version 14 or higher)</li>
                      <li>npm or yarn</li>
                      <li>A code editor of your choice</li>
                    </ul>
                    
                    <DocHeading level={2} id="create-project">Create a new project</DocHeading>
                    <DocParagraph>
                      Run the following command to create a new project:
                    </DocParagraph>
                    
                    <DocCode 
                      code="npx create-platform-app my-awesome-app" 
                      language="bash" 
                    />
                    
                    <DocHeading level={2} id="start-dev">Start the development server</DocHeading>
                    <DocParagraph>
                      Navigate to your project directory and start the development server:
                    </DocParagraph>
                    
                    <DocCode 
                      code={`cd my-awesome-app
npm run dev`} 
                      language="bash" 
                    />
                    
                    <DocParagraph>
                      Your application should now be running at <code className="bg-gray-100 px-1 py-0.5 rounded">http://localhost:3000</code>.
                    </DocParagraph>
                  </>
                )}
              </div>
            </DocContent>
          </main>
        </SidebarInset>
      </div>

      {/* Command+K Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Command className="h-5 w-5" />
              Search Documentation
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              ref={searchInputRef}
              placeholder="Search for topics, guides, and more..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="mb-4"
              autoFocus
            />
            
            {searchResults.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-md cursor-pointer ${index === selectedResultIndex ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                      // Find the section
                      const section = sections.find(s => s.title === result.section);
                      if (section) {
                        handleSectionClick(section);
                        handleItemClick(result.item);
                        setIsSearchOpen(false);
                      }
                    }}
                  >
                    <div className="font-medium">{result.item.title}</div>
                    <div className="text-sm text-gray-500">{result.section}</div>
                  </div>
                ))}
              </div>
            ) : searchQuery.trim() !== "" ? (
              <div className="text-center py-8 text-gray-500">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Type to start searching...
                <div className="mt-2 text-xs text-gray-400">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md">↓</kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md">Enter</kbd>
                    <span>to select</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Index;
