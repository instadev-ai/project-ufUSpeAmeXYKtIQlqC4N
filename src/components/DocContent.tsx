
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface DocContentProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

interface DocHeadingProps {
  children: React.ReactNode;
  id?: string;
  level?: 1 | 2 | 3 | 4;
}

interface DocParagraphProps {
  children: React.ReactNode;
}

interface DocAlertProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success";
}

interface DocCodeProps {
  code: string;
  language?: string;
}

export const DocHeading: React.FC<DocHeadingProps> = ({ 
  children, 
  id, 
  level = 2 
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const className = {
    1: "text-3xl font-bold mt-8 mb-4 scroll-m-20",
    2: "text-2xl font-semibold mt-8 mb-3 scroll-m-20",
    3: "text-xl font-semibold mt-6 mb-3 scroll-m-20",
    4: "text-lg font-medium mt-4 mb-2 scroll-m-20",
  }[level];
  
  return (
    <Tag id={id} className={className}>
      {children}
      {id && (
        <a 
          href={`#${id}`} 
          className="ml-2 text-gray-400 opacity-0 hover:opacity-100 text-sm"
          aria-label="Link to this heading"
        >
          #
        </a>
      )}
    </Tag>
  );
};

export const DocParagraph: React.FC<DocParagraphProps> = ({ children }) => {
  return (
    <p className="leading-7 mb-4 text-gray-700">
      {children}
    </p>
  );
};

export const DocAlert: React.FC<DocAlertProps> = ({ 
  children, 
  type = "info" 
}) => {
  const icons = {
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />
  };
  
  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    success: "bg-green-50 text-green-800 border-green-200"
  };
  
  return (
    <Alert className={`mb-4 ${styles[type]}`}>
      <div className="flex gap-2">
        {icons[type]}
        <AlertDescription>{children}</AlertDescription>
      </div>
    </Alert>
  );
};

export const DocCode: React.FC<DocCodeProps> = ({ code, language }) => {
  return (
    <div className="my-4">
      <CodeBlock code={code} language={language} />
    </div>
  );
};

export const DocCard: React.FC<DocContentProps> = ({ children }) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
};

const DocContent: React.FC<DocContentProps> = ({ children, fullWidth = true }) => {
  return (
    <div className={fullWidth ? "w-full py-6" : "max-w-3xl mx-auto py-6"}>
      {children}
    </div>
  );
};

export default DocContent;
