import { useState } from "react";
import { Playthrough as TPlaythrough } from "@prisma/client";
import EditPlaythrough from "./EditPlaythrough";

interface PlaythroughProps {
  playthrough: TPlaythrough;
  handleUpdate: (
    id: number,
    title: string,
    platform: string,
    status: string,
    startedOn: string,
    finishedOn: string,
  ) => void;
}

export default function Playthrough({
  playthrough,
  handleUpdate,
}: PlaythroughProps) {
  const [isOpen, setIsOpen] = useState(false);

  function getDate(date: string) {
    if (date) {
      return date.substring(0, 10);
    }
    return "";
  }

  function savePlaythrough(
    title: string,
    platform: string,
    status: string,
    startedOn: Date,
    finishedOn: Date,
  ) {
    handleUpdate(
      playthrough.id,
      title,
      platform,
      status,
      startedOn,
      finishedOn,
    );
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
        <span>
          {getDate(playthrough.startedOn)} {getDate(playthrough.finishedOn)}
        </span>
      </li>
    );
  }
}
