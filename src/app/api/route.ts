import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  const playthroughs = await prisma.playthrough.findMany();

  const data = playthroughs.map((p) => {
    console.debug(`Status for ${p.id} is ${p.status}`);
    return {
      id: p.id,
      title: p.title,
      platform: p.platform,
      status: p.status,
    };
  });

  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const myData = await request.json();

  const playthrough = await prisma.playthrough.create({
    data: {
      title: myData.title,
      platform: myData.platform,
      status: "UNPLAYED",
    },
  });

  return new Response(
    JSON.stringify({
      title: playthrough.title,
      platform: playthrough.platform,
      status: playthrough.status,
    }),
  );
}
