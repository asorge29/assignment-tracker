import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import LoginBtn from "@/components/loginBtn";
import LogoutBtn from "@/components/logoutBtn";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    return (
      <LoginBtn />
    );
  }

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Avatar
            className="hover:cursor-pointer"
          >
            <AvatarImage
              src={session?.user?.image ?? undefined}
              alt={`${session?.user?.name} Profile Picture` || "User Profile Picture"}
            />
            <AvatarFallback>
              {session?.user?.name
                ? `${session.user.name.charAt(0)}${
                  session.user.name.split(" ")[1]?.charAt(0) || ""
                }`
                : undefined}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col p-0 w-auto m-2">
          <div className="flex items-center justify-center p-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt={session?.user?.name || "User avatar"}
              />
              <AvatarFallback className="h-24 w-24">
                {session?.user?.name
                  ? `${session.user.name.charAt(0)}${
                    session.user.name.split(" ")[1]?.charAt(0) || ""
                  }`
                  : undefined}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-6 pt-0">
            <div className="text-2xl font-semibold leading-none tracking-tight">{session?.user?.name}</div>
            <div className="text-sm text-muted-foreground">{session?.user?.email}</div>
          </div>
          <div className="flex justify-center items-center p-6 pt-0">
            <LogoutBtn />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
