import { useState } from "react";
import { TPlaythrough } from "@prisma/client";
import EditPlaythrough from "./EditPlaythrough";

interface PlaythroughProps {
  playthrough: TPlaythrough;
  handleUpdate: (
    id: number,
    title: string,
    platform: string,
    status: string,
  ) => void;
}

export default function Playthrough({
  playthrough,
  handleUpdate,
}: PlaythroughProps) {
  const [isOpen, setIsOpen] = useState(false);

  function savePlaythrough(
    newTitle: string,
    newPlatform: string,
    newStatus: string,
  ) {
    handleUpdate(playthrough.id, newTitle, newPlatform, newStatus);
    setIsOpen(false);
  }

  if (isOpen) {
    return (
      <li>
        <EditPlaythrough
          playthrough={playthrough}
          updateHandler={savePlaythrough}
        />
      </li>
    );
  } else {
    return (
      <li onClick={() => setIsOpen(true)}>
        {playthrough.title} <span>{playthrough.platform}</span>
        <span>dates</span>
      </li>
    );
  }
}
