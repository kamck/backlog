import { PrismaClient } from "@prisma/client"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  console.debug(`Got ID ${params.id}`);

  const prisma = new PrismaClient();
  const myData = await request.json();

  await prisma.playthrough.update({
    where: { id: Number(params.id) },
    data: { title: myData.title },
  });

  return new Response();
}

