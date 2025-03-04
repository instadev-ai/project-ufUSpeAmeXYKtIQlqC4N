
import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  language = "javascript", 
  code,
  className
}) => {
  return (
    <div className={cn(
      "relative rounded-md bg-gray-900 p-4 overflow-x-auto",
      className
    )}>
      <div className="absolute top-3 right-3 flex space-x-1">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="text-sm text-gray-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
