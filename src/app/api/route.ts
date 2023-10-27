export async function POST(request: Request) {
  const myData = await request.json();
  console.log(`Data ${myData.message}`);

  return new Response("Success");
}
