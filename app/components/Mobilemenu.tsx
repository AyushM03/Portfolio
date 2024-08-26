import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navigationItems } from "./Navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Mobilemenu() {
  const location = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    setOpen(false);

  },[location]
  );
  return (
    <Sheet open={open} onOpenChange={(state)=>setOpen(state)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="mt-15 flex px-10 space-y-0 flex-col">
        {navigationItems.map((item, index) => (
          <Link key={index} href={item.href} className={cn(
            location === item.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75', 'group flex items-center px-2 py-2 font-semibold rounded-md'
          )}>
            {item.name}
            
          </Link>
        ))}
        

        <SheetFooter>
            <SheetClose asChild>
            <Button type="submit" className="bg-gradient-to-r from-[#FFBB00] to-[#e09200]">close</Button>
            </SheetClose>
        </SheetFooter>

      </SheetContent>
      
    </Sheet>
  );
}
