import { PrismaClient } from "@prisma/client";

function getDate(dateStr: string) {
  return dateStr.trim().length > 0 ? new Date(dateStr) : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const prisma = new PrismaClient();
  const myData = await request.json();

  if (!["UNPLAYED", "UNFINISHED", "FINISHED"].includes(myData.status)) {
    return new Response(null, { status: 422 });
  }

  await prisma.playthrough.update({
    where: { id: Number(params.id) },
    data: {
      title: myData.title,
      platform: myData.platform,
      status: myData.status,
      startedOn: getDate(myData.startedOn),
      finishedOn: getDate(myData.finishedOn),
    },
  });

  return new Response();
}
