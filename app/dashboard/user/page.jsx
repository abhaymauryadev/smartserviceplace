import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardUI from "./UserDashboard/page";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DashboardUI user={session?.user} />
    </>
  );
}