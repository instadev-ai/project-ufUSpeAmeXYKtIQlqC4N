
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Documentation sections
const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", content: "Welcome to our documentation! This guide will help you get started with our platform." },
      { title: "Quick Start", content: "Follow these steps to quickly set up your first project." },
      { title: "Installation", content: "Learn how to install our software on different platforms." }
    ]
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Architecture", content: "Understand the architecture behind our platform." },
      { title: "Data Model", content: "Learn about our data model and how it's structured." },
      { title: "Authentication", content: "Implement authentication in your applications." }
    ]
  },
  {
    title: "Guides",
    items: [
      { title: "User Management", content: "Learn how to manage users in your application." },
      { title: "API Integration", content: "Integrate with our API for extended functionality." },
      { title: "Deployment", content: "Deploy your application to production environments." }
    ]
  },
  {
    title: "API Reference",
    items: [
      { title: "Endpoints", content: "Explore all available API endpoints." },
      { title: "Parameters", content: "Learn about the parameters for each endpoint." },
      { title: "Responses", content: "Understand the structure of API responses." }
    ]
  }
];

const DocsContent = ({ section, item }) => {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">{item.title}</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-gray-700 mb-4">{item.content}</p>
        
        {/* Example content - would be replaced with real documentation */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Examples</h2>
        <p>
          Here are some examples of how to use this feature:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4 font-mono text-sm">
          <pre>{`// Example code
function example() {
  return "Hello World";
}`}</pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Parameters</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">param1</td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">The first parameter</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">param2</td>
              <td className="border border-gray-300 px-4 py-2">number</td>
              <td className="border border-gray-300 px-4 py-2">The second parameter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [activeItem, setActiveItem] = useState(sections[0].items[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setActiveItem(section.items[0]);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            {sections.map((section) => (
              <div key={section.title} className="mb-4">
                <h3 className="px-4 text-sm font-medium text-gray-500 mb-1">{section.title}</h3>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={activeItem.title === item.title}
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
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Tabs defaultValue="docs" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="docs">Documentation</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Feedback</Button>
                  <Button size="sm">Get Started</Button>
                </div>
              </div>
            </Tabs>
          </header>
          
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <DocsContent section={activeSection} item={activeItem} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
