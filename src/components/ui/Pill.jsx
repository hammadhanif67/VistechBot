import { Zap } from "lucide-react";

/**
 * Reusable pill/badge component used across all sections.
 * @param {React.ReactNode} children
 * @param {React.ElementType} [icon=Zap]
 */
export default function Pill({ children, icon: Icon = Zap }) {
  return (
    <div className="pill">
      <Icon size={14} fill="currentColor" />
      {children}
    </div>
  );
}
