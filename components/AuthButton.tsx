import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface StyledButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function AuthButton({
  className,
  children,
  onClick,
}: StyledButtonProps) {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "border-2 border-purple-950 mr-2 my-2 p-2 h-[55px] bg-purple-50 text-purple-900 w-[170px] rounded-4xl text-lg font-bold flex justify-center items-center hover:text-white hover:bg-purple-900 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
