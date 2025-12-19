import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">My Profile</h1>

      <div className="bg-white p-4 rounded border space-y-2">
        <p><strong>Name:</strong> {session.user.name}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
        <p><strong>Role:</strong> {session.user.role}</p>
      </div>
    </>
  );
}
