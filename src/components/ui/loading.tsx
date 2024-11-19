import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: String;
}
const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2
        className={cn("animate-spin text-primary w-10 h-10", className)}
      />
    </div>
  );
};
export default Loading;
