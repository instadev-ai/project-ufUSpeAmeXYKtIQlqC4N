
import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import DocHeader from "@/components/DocHeader";
import DocContent, { DocHeading, DocParagraph, DocAlert, DocCode } from "@/components/DocContent";
import ApiEndpoint from "@/components/ApiEndpoint";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// API sections
const apiSections = [
  {
    title: "Introduction",
    items: [
      { title: "Overview", id: "overview" },
      { title: "Authentication", id: "authentication" },
      { title: "Rate Limits", id: "rate-limits" }
    ]
  },
  {
    title: "Resources",
    items: [
      { title: "Users", id: "users" },
      { title: "Projects", id: "projects" },
      { title: "Documents", id: "documents" }
    ]
  },
  {
    title: "Guides",
    items: [
      { title: "Pagination", id: "pagination" },
      { title: "Errors", id: "errors" },
      { title: "Webhooks", id: "webhooks" }
    ]
  }
];

const ApiDocs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const searchInputRef = useRef(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    // Update URL with the section ID (without hash)
    window.history.pushState({}, "", `/api/${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    apiSections.forEach(section => {
      section.items.forEach(item => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
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
      scrollToSection(result.item.id);
      setIsSearchOpen(false);
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
    const path = window.location.pathname.replace(/^\/api\//, ""); // Remove leading /api/
    if (path) {
      setActiveSection(path);
      setTimeout(() => {
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
                <span className="font-bold text-lg">API Docs</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search API docs..."
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
            {apiSections.map((section) => (
              <div key={section.title} className="mb-4">
                <h3 className="px-4 text-sm font-medium text-gray-500 mb-1">{section.title}</h3>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activeSection === item.id}
                        onClick={() => scrollToSection(item.id)}
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
          <DocHeader activeTab="api" />
          
          <main className="flex-1 overflow-auto p-6 sm:p-10">
            <DocContent>
              <div className="max-w-5xl mx-auto">
                <DocHeading level={1} id="api-reference">API Reference</DocHeading>
                
                <DocParagraph>
                  Our REST API provides programmatic access to our platform's data and functionality.
                  This reference documents all the endpoints available in our API, along with examples
                  of requests and responses.
                </DocParagraph>
                
                <DocAlert type="info">
                  All API requests require authentication using an API key. You can generate an API key
                  in your account settings.
                </DocAlert>
                
                <DocHeading level={2} id="overview">Overview</DocHeading>
                
                <DocParagraph>
                  Our API follows RESTful principles and uses standard HTTP methods. All requests should be made to the base URL:
                </DocParagraph>
                
                <DocCode 
                  code={`https://api.example.com/v1`} 
                  language="bash"
                />
                
                <DocParagraph>
                  All responses are returned in JSON format with the following structure:
                </DocParagraph>
                
                <DocCode 
                  code={JSON.stringify({
                    data: {
                      // Response data
                    },
                    meta: {
                      // Metadata about the response
                    }
                  }, null, 2)} 
                  language="json"
                />
                
                <DocHeading level={2} id="authentication">Authentication</DocHeading>
                
                <DocParagraph>
                  To authenticate your API requests, include your API key in the Authorization header:
                </DocParagraph>
                
                <DocCode 
                  code={`Authorization: Bearer YOUR_API_KEY`} 
                  language="bash"
                />
                
                <DocHeading level={2} id="users">Users</DocHeading>
                
                <ApiEndpoint
                  method="GET"
                  path="/api/v1/users"
                  description="Returns a list of users"
                  parameters={[
                    {
                      name: "page",
                      type: "integer",
                      required: false,
                      description: "Page number for pagination"
                    },
                    {
                      name: "limit",
                      type: "integer",
                      required: false,
                      description: "Number of results per page (max 100)"
                    }
                  ]}
                  responses={[
                    {
                      status: 200,
                      description: "Successful response",
                      example: JSON.stringify({
                        data: [
                          {
                            id: "user_123",
                            name: "John Doe",
                            email: "john@example.com",
                            created_at: "2023-01-15T08:30:00Z"
                          },
                          {
                            id: "user_456",
                            name: "Jane Smith",
                            email: "jane@example.com",
                            created_at: "2023-02-20T14:15:00Z"
                          }
                        ],
                        meta: {
                          total: 42,
                          page: 1,
                          limit: 10
                        }
                      }, null, 2)
                    },
                    {
                      status: 401,
                      description: "Unauthorized",
                      example: JSON.stringify({
                        error: {
                          code: "unauthorized",
                          message: "API key is missing or invalid"
                        }
                      }, null, 2)
                    }
                  ]}
                />
                
                <ApiEndpoint
                  method="GET"
                  path="/api/v1/users/:id"
                  description="Returns a specific user by ID"
                  parameters={[
                    {
                      name: "id",
                      type: "string",
                      required: true,
                      description: "The user ID"
                    }
                  ]}
                  responses={[
                    {
                      status: 200,
                      description: "Successful response",
                      example: JSON.stringify({
                        data: {
                          id: "user_123",
                          name: "John Doe",
                          email: "john@example.com",
                          created_at: "2023-01-15T08:30:00Z",
                          updated_at: "2023-03-10T11:20:00Z",
                          role: "admin",
                          settings: {
                            notifications: true,
                            theme: "light"
                          }
                        }
                      }, null, 2)
                    },
                    {
                      status: 404,
                      description: "User not found",
                      example: JSON.stringify({
                        error: {
                          code: "not_found",
                          message: "User with ID 'user_123' not found"
                        }
                      }, null, 2)
                    }
                  ]}
                />
                
                <ApiEndpoint
                  method="POST"
                  path="/api/v1/users"
                  description="Creates a new user"
                  parameters={[
                    {
                      name: "name",
                      type: "string",
                      required: true,
                      description: "The user's full name"
                    },
                    {
                      name: "email",
                      type: "string",
                      required: true,
                      description: "The user's email address"
                    },
                    {
                      name: "role",
                      type: "string",
                      required: false,
                      description: "The user's role (default: 'user')"
                    }
                  ]}
                  requestExample={JSON.stringify({
                    name: "Alice Johnson",
                    email: "alice@example.com",
                    role: "editor"
                  }, null, 2)}
                  responses={[
                    {
                      status: 201,
                      description: "User created successfully",
                      example: JSON.stringify({
                        data: {
                          id: "user_789",
                          name: "Alice Johnson",
                          email: "alice@example.com",
                          role: "editor",
                          created_at: "2023-04-25T09:45:00Z",
                          updated_at: "2023-04-25T09:45:00Z"
                        }
                      }, null, 2)
                    },
                    {
                      status: 400,
                      description: "Invalid request",
                      example: JSON.stringify({
                        error: {
                          code: "validation_error",
                          message: "Invalid request data",
                          details: [
                            {
                              field: "email",
                              message: "Email is already in use"
                            }
                          ]
                        }
                      }, null, 2)
                    }
                  ]}
                />
                
                <DocHeading level={2} id="rate-limits">Rate Limits</DocHeading>
                
                <DocParagraph>
                  Our API implements rate limiting to ensure fair usage and system stability.
                  The current rate limits are:
                </DocParagraph>
                
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>100 requests per minute for standard accounts</li>
                  <li>300 requests per minute for premium accounts</li>
                  <li>1000 requests per minute for enterprise accounts</li>
                </ul>
                
                <DocAlert type="warning">
                  If you exceed the rate limit, your requests will be rejected with a 429 Too Many Requests
                  status code until the rate limit period resets.
                </DocAlert>
                
                <DocParagraph>
                  Rate limit information is included in the response headers:
                </DocParagraph>
                
                <DocCode 
                  code={`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1619194800`} 
                  language="bash"
                />
                
                <DocHeading level={2} id="pagination">Pagination</DocHeading>
                
                <DocParagraph>
                  For endpoints that return lists of items, we support pagination using the <code>page</code> and <code>limit</code> parameters.
                  Pagination information is included in the <code>meta</code> object of the response.
                </DocParagraph>
                
                <DocCode 
                  code={JSON.stringify({
                    data: [
                      // List of items
                    ],
                    meta: {
                      total: 42,
                      page: 1,
                      limit: 10,
                      pages: 5
                    }
                  }, null, 2)} 
                  language="json"
                />
                
                <DocHeading level={2} id="errors">Error Handling</DocHeading>
                
                <DocParagraph>
                  When an error occurs, the API will return an appropriate HTTP status code along with a JSON response
                  containing information about the error.
                </DocParagraph>
                
                <DocCode 
                  code={JSON.stringify({
                    error: {
                      code: "validation_error",
                      message: "Invalid request data",
                      details: [
                        {
                          field: "email",
                          message: "Email is required"
                        }
                      ]
                    }
                  }, null, 2)} 
                  language="json"
                />
                
                <DocHeading level={2} id="webhooks">Webhooks</DocHeading>
                
                <DocParagraph>
                  Webhooks allow you to receive real-time notifications when certain events occur in your account.
                  You can configure webhooks in your account settings.
                </DocParagraph>
                
                <DocAlert type="info">
                  Webhook requests will be sent as HTTP POST requests to the URL you specify, with the event data in the request body.
                </DocAlert>
                
                <DocParagraph>
                  Here's an example of a webhook payload:
                </DocParagraph>
                
                <DocCode 
                  code={JSON.stringify({
                    event: "user.created",
                    timestamp: "2023-04-25T09:45:00Z",
                    data: {
                      id: "user_789",
                      name: "Alice Johnson",
                      email: "alice@example.com",
                      role: "editor"
                    }
                  }, null, 2)} 
                  language="json"
                />
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
              Search API Documentation
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              ref={searchInputRef}
              placeholder="Search for API endpoints, parameters, and more..."
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
                      scrollToSection(result.item.id);
                      setIsSearchOpen(false);
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

export default ApiDocs;
