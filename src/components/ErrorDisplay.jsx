import { AlertCircle } from "lucide-react";

const ErrorDisplay = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
  </div>
);

export default ErrorDisplay;
