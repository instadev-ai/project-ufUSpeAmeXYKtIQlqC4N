
import React, { useState, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import DocHeader from "@/components/DocHeader";
import DocContent, { DocHeading, DocParagraph, DocAlert, DocCode, DocCard } from "@/components/DocContent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Examples sections
const exampleSections = [
  {
    title: "Basic Examples",
    items: [
      { title: "Authentication", id: "auth-example", description: "Learn how to authenticate with our API" },
      { title: "User Management", id: "user-example", description: "Examples for managing users" },
      { title: "Data Fetching", id: "data-example", description: "How to fetch and display data" }
    ]
  },
  {
    title: "Advanced Examples",
    items: [
      { title: "Real-time Updates", id: "realtime-example", description: "Implementing real-time features" },
      { title: "File Uploads", id: "upload-example", description: "Handling file uploads" },
      { title: "Webhooks", id: "webhook-example", description: "Setting up and using webhooks" }
    ]
  },
  {
    title: "Integrations",
    items: [
      { title: "React Integration", id: "react-example", description: "Using our SDK with React" },
      { title: "Vue Integration", id: "vue-example", description: "Using our SDK with Vue" },
      { title: "Angular Integration", id: "angular-example", description: "Using our SDK with Angular" }
    ]
  }
];

const Examples = () => {
  const [activeSection, setActiveSection] = useState(exampleSections[0]);
  const [activeItem, setActiveItem] = useState(exampleSections[0].items[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setActiveItem(section.items[0]);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Update URL with the item ID
    window.history.pushState({}, "", `/examples#${item.id}`);
  };

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    // Search through all sections and items
    const results = [];
    exampleSections.forEach(section => {
      section.items.forEach(item => {
        if (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            section: section.title,
            item
          });
        }
      });
    });
    
    setSearchResults(results);
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

  // Handle URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Find the item with the matching ID
      for (const section of exampleSections) {
        const item = section.items.find(item => item.id === hash);
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
                <span className="font-bold text-lg">Examples</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search examples..."
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
            {exampleSections.map((section) => (
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
          <DocHeader activeTab="examples" />
          
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <DocContent>
              <DocHeading level={1} id={activeItem.id}>{activeItem.title}</DocHeading>
              <DocParagraph>{activeItem.description}</DocParagraph>
              
              {activeItem.id === "auth-example" && (
                <>
                  <DocAlert type="info">
                    This example demonstrates how to authenticate with our API using different methods.
                  </DocAlert>
                  
                  <DocHeading level={2} id="api-key-auth">API Key Authentication</DocHeading>
                  <DocParagraph>
                    The simplest way to authenticate is using an API key. Here's an example:
                  </DocParagraph>
                  
                  <DocCode 
                    code={`import { Client } from '@platform/sdk';

// Initialize the client with an API key
const client = new Client({
  apiKey: 'your-api-key'
});

// Make an authenticated request
const users = await client.users.list();`} 
                    language="javascript" 
                  />
                  
                  <DocHeading level={2} id="oauth-auth">OAuth Authentication</DocHeading>
                  <DocParagraph>
                    For more secure applications, you can use OAuth:
                  </DocParagraph>
                  
                  <DocCode 
                    code={`import { OAuthClient } from '@platform/sdk';

// Initialize the OAuth client
const client = new OAuthClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'https://your-app.com/callback'
});

// Generate the authorization URL
const authUrl = client.getAuthorizationUrl({
  scope: ['read', 'write']
});

// Redirect the user to the authorization URL
window.location.href = authUrl;

// In your callback handler:
const handleCallback = async (code) => {
  // Exchange the code for tokens
  const tokens = await client.getTokensFromCode(code);
  
  // Initialize an authenticated client
  const authenticatedClient = new OAuthClient({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  });
  
  // Make authenticated requests
  const users = await authenticatedClient.users.list();
};`} 
                    language="javascript" 
                  />
                </>
              )}
              
              {activeItem.id === "react-example" && (
                <>
                  <DocAlert type="success">
                    Our SDK integrates seamlessly with React applications.
                  </DocAlert>
                  
                  <DocHeading level={2} id="react-setup">Setting up with React</DocHeading>
                  <DocParagraph>
                    First, install our SDK and React hooks package:
                  </DocParagraph>
                  
                  <DocCode 
                    code={`npm install @platform/sdk @platform/react-hooks`} 
                    language="bash" 
                  />
                  
                  <DocHeading level={2} id="react-provider">Set up the Provider</DocHeading>
                  <DocParagraph>
                    Wrap your application with our provider:
                  </DocParagraph>
                  
                  <DocCode 
                    code={`import { PlatformProvider } from '@platform/react-hooks';
import { createClient } from '@platform/sdk';

function App() {
  const client = createClient({
    apiKey: 'your-api-key'
  });

  return (
    <PlatformProvider client={client}>
      <YourApp />
    </PlatformProvider>
  );
}`} 
                    language="jsx" 
                  />
                  
                  <DocHeading level={2} id="react-hooks">Using the Hooks</DocHeading>
                  <DocParagraph>
                    Now you can use our hooks in your components:
                  </DocParagraph>
                  
                  <DocCode 
                    code={`import { useUsers, useUser } from '@platform/react-hooks';

function UsersList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function UserProfile({ userId }) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}`} 
                    language="jsx" 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <DocCard>
                      <DocHeading level={3}>Automatic Caching</DocHeading>
                      <DocParagraph>
                        Our React hooks automatically cache data to minimize API calls.
                      </DocParagraph>
                    </DocCard>
                    
                    <DocCard>
                      <DocHeading level={3}>Real-time Updates</DocHeading>
                      <DocParagraph>
                        Subscribe to real-time updates with our useSubscription hook.
                      </DocParagraph>
                    </DocCard>
                  </div>
                </>
              )}
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
              Search Examples
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Search for examples, code snippets, and more..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="mb-4"
              autoFocus
            />
            
            {searchResults.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div 
                    key={index} 
                    className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => {
                      // Find the section
                      const section = exampleSections.find(s => s.title === result.section);
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
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Examples;
