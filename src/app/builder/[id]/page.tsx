export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@clerk/nextjs/server";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { userId } = await auth();

  return (
    <div>
      User ID: {userId}
      <br />
      Resume ID: {params.id}
    </div>
  );
}