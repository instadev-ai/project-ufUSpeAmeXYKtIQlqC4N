
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Code, 
  Search, 
  Zap, 
  Layout, 
  Smartphone, 
  Moon, 
  Github, 
  Twitter, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span className="font-bold text-lg">DocsFlow</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">Documentation</Link>
              <Link to="/api" className="transition-colors hover:text-foreground/80 text-foreground/60">API</Link>
              <Link to="/examples" className="transition-colors hover:text-foreground/80 text-foreground/60">Examples</Link>
              <Link to="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm">Log in</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Beautiful Documentation
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Documentation that your users will love
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Create beautiful, searchable, and user-friendly documentation that helps your users succeed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/docs">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/examples">View Examples</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="container px-4 md:px-6 py-8 md:py-12">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b bg-muted/50 px-4">
            <div className="flex items-center gap-2 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <Tabs defaultValue="docs">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="docs">Documentation</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex w-16 items-center justify-end">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="aspect-[16/9] overflow-hidden bg-white">
            <img 
              src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Documentation preview" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need for perfect documentation
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to create, manage, and share documentation that your users will love.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <Search className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Powerful Search</h3>
                <p className="text-gray-500">
                  Help users find exactly what they need with lightning-fast search.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Code className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Beautiful Code</h3>
                <p className="text-gray-500">
                  Syntax highlighting and code snippets that are easy to read and copy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Layout className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Intuitive Layout</h3>
                <p className="text-gray-500">
                  Clean, organized structure that makes navigation effortless.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Smartphone className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-bold">Fully Responsive</h3>
                <p className="text-gray-500">
                  Perfect experience on any device, from desktop to mobile.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Loved by developers and users alike
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              See what people are saying about our documentation platform.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500">
                      "This documentation platform has transformed how our users interact with our product. The search functionality is incredible."
                    </p>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">CTO at TechFlow</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500">
                      "The code examples are so clean and easy to follow. It's made our API much more accessible to developers."
                    </p>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">Lead Developer at DevHub</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-500">
                      "We've seen a 40% reduction in support tickets since implementing this documentation. The user experience is simply outstanding."
                    </p>
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-gray-500">Product Manager at SaaS Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Choose the plan that's right for your team and documentation needs.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <div className="text-4xl font-bold">$0<span className="text-sm font-normal text-gray-500">/month</span></div>
                  <p className="text-gray-500">Perfect for personal projects and small teams.</p>
                  <ul className="space-y-2">
                    {["1 project", "Basic search", "Community support", "Basic customization"].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">Get Started</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-primary">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Popular
                  </div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="text-4xl font-bold">$49<span className="text-sm font-normal text-gray-500">/month</span></div>
                  <p className="text-gray-500">For growing teams that need more features.</p>
                  <ul className="space-y-2">
                    {[
                      "10 projects",
                      "Advanced search",
                      "Priority support",
                      "Custom domains",
                      "Analytics",
                      "Team collaboration"
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <div className="text-4xl font-bold">Custom</div>
                  <p className="text-gray-500">For large organizations with specific requirements.</p>
                  <ul className="space-y-2">
                    {[
                      "Unlimited projects",
                      "Advanced search with AI",
                      "Dedicated support",
                      "SSO & advanced security",
                      "Custom integrations",
                      "SLA guarantees"
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">Contact Sales</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to create documentation your users will love?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Join thousands of teams who are creating beautiful, user-friendly documentation with our platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/docs">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">D</span>
                </div>
                <span className="font-bold text-lg">DocsFlow</span>
              </div>
              <p className="text-sm text-gray-500">
                Beautiful documentation that your users will love.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/docs" className="hover:underline">Documentation</Link></li>
                <li><Link to="/api" className="hover:underline">API Reference</Link></li>
                <li><Link to="/examples" className="hover:underline">Examples</Link></li>
                <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Guides</a></li>
                <li><a href="#" className="hover:underline">Support</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} DocsFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
