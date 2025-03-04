
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DocHeader from "@/components/DocHeader";
import DocContent, { DocHeading, DocParagraph, DocAlert, DocCode, DocCard } from "@/components/DocContent";

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
          <DocHeader activeTab="docs" />
          
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <DocContent>
              <DocHeading level={1}>{activeItem.title}</DocHeading>
              <DocParagraph>{activeItem.content}</DocParagraph>
              
              {activeItem.title === "Introduction" && (
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
              
              {activeItem.title === "Quick Start" && (
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
            </DocContent>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
