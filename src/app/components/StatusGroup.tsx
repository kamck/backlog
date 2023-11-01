import Playthrough from "./Playthrough";
import type { Playthrough as TPlaythrough } from "@prisma/client";

export default function StatusGroup({
  status,
  playthroughs,
  handleUpdate,
}: {
  status: string;
  playthroughs: TPlaythrough[];
  handleUpdate: (
    id: number,
    title: string,
    platform: string,
    status: string,
  ) => void;
}) {
  const buildList = playthroughs
    .filter((p) => p.status === status.toUpperCase())
    .map((d) => (
      <Playthrough
        key={d.id}
        id={d.id}
        title={d.title}
        platform={d.platform}
        status={d.status}
        handleUpdate={handleUpdate}
      />
    ));

  return (
    <div>
      <h1>{status}</h1>
      <ul>{buildList}</ul>
    </div>
  );
}
