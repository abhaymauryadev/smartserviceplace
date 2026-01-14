import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/common/Header";
import DashboardUI from "./UserDashboard/page";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* <Header /> */}
      <DashboardUI user={session?.user} />

    </>
  );
}