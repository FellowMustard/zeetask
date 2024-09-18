import { FaExclamationTriangle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
interface StatusFormProps {
  isError?: boolean;
  message?: string;
}
function StatusForm({ isError = false, message }: StatusFormProps) {
  if (!message) return null;

  return (
    <div
      className={`${
        isError
          ? "bg-destructive/15 text-destructive"
          : "bg-green-500/15 text-green-500"
      } gap-x-2 flex rounded-md text-sm p-3 items-center`}
    >
      {isError ? (
        <FaExclamationTriangle className="self-center min-w-4" />
      ) : (
        <FaCheckCircle className="self-center min-w-4" />
      )}
      {message}
    </div>
  );
}

export default StatusForm;
