
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./CodeBlock";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Response {
  status: number;
  description: string;
  example: string;
}

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  parameters?: Parameter[];
  responses?: Response[];
  requestExample?: string;
}

const methodColors = {
  GET: "bg-blue-100 text-blue-800 border-blue-200",
  POST: "bg-green-100 text-green-800 border-green-200",
  PUT: "bg-yellow-100 text-yellow-800 border-yellow-200",
  DELETE: "bg-red-100 text-red-800 border-red-200",
  PATCH: "bg-purple-100 text-purple-800 border-purple-200"
};

const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  method,
  path,
  description,
  parameters = [],
  responses = [],
  requestExample
}) => {
  return (
    <div className="mb-10 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Badge className={`font-mono ${methodColors[method]}`}>{method}</Badge>
          <code className="text-sm font-semibold">{path}</code>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="parameters">
          <TabsList className="mb-4">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            {requestExample && <TabsTrigger value="example">Example</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="parameters">
            {parameters.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b">Required</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameters.map((param, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="px-4 py-2 font-mono text-sm">{param.name}</td>
                        <td className="px-4 py-2 text-sm">{param.type}</td>
                        <td className="px-4 py-2 text-sm">
                          {param.required ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Required</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Optional</Badge>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No parameters required</p>
            )}
          </TabsContent>
          
          <TabsContent value="responses">
            {responses.map((response, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={
                    response.status >= 200 && response.status < 300
                      ? "bg-green-100 text-green-800 border-green-200"
                      : response.status >= 400
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }>
                    {response.status}
                  </Badge>
                  <span className="text-sm text-gray-700">{response.description}</span>
                </div>
                <CodeBlock code={response.example} language="json" />
              </div>
            ))}
          </TabsContent>
          
          {requestExample && (
            <TabsContent value="example">
              <CodeBlock code={requestExample} language="json" />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ApiEndpoint;
