import { toast } from "sonner";

export const showSuccessToast = ({ heading, message, icon = "✅" } = {}) => {
  toast(
    <div className="text-white space-y-1">
      <p className="font-semibold">{heading}</p>
      <p className="text-sm text-gray-400">{message}</p>
    </div>,
    {
      style: {
        background: "#1e1e1e",
        border: "1px solid #444",
        borderRadius: "8px",
      },
      icon,
    }
  );
};

export const showErrorToast = ({ heading, message, icon = "❌" } = {}) => {
  toast(
    <div className="text-white space-y-1">
      <p className="font-semibold">{heading}</p>
      <p className="text-sm text-gray-400">{message}</p>
    </div>,
    {
      style: {
        background: "#1e1e1e",
        color: "#ff6b6b",
        border: "1px solid #ff4d4f",
        borderRadius: "8px",
      },
      icon,
    }
  );
};
