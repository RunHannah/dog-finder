import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

interface StyledButtonProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function CustomButton({
  className,
  children,
  href,
  onClick,
}: StyledButtonProps) {
  // Handle the case when href is provided
  if (href) {
    return (
      <Link
        className={cn(
          "h-10 md:h-14 text-base w-full md:w-[30%] lg:w-[150px] xl:w-[200px] border-2 rounded-md cursor-pointer",
          className
        )}
        href="/favorites"
      >
        {children}
      </Link>
    );
  }

  return (
    <Button
      variant={"outline"}
      className={cn(
        "h-10 md:h-14 text-base w-full md:w-[30%] lg:w-[150px] xl:w-[200px] border-2 rounded-md cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
