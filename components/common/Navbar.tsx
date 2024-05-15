import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();


  return (
    <div className="flex items-center justify-between h-12 border border-b-slate-300 px-4">
      {/* Left Side */}
      <div></div>

      {/* Right Side */}
      <div className="flex gap-4">
        <p>{session?.user?.name}</p>
        <p className="font-sans">Subscription</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={session?.user?.image || ""}
              alt="User Image"
              width={30}
              height={30}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => signOut()}>Sign Out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
