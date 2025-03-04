
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DocHeader from "@/components/DocHeader";
import DocContent, { DocHeading, DocParagraph, DocAlert, DocCode } from "@/components/DocContent";
import ApiEndpoint from "@/components/ApiEndpoint";

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

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
                <span className="font-bold text-lg">API Docs</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search API docs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
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
          
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <DocContent>
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
            </DocContent>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ApiDocs;
