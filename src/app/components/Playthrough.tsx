import { useState } from "react";
import EditPlaythrough from "./EditPlaythrough";

interface PlaythroughProps {
  id: number;
  title: string;
  platform: string;
  status: string;
  updateHandler: (
    id: number,
    title: string,
    platform: string,
    status: string,
  ) => void;
}

export default function Playthrough({
  id,
  title,
  platform,
  status,
  updateHandler,
}: PlaythroughProps) {
  const [isOpen, setIsOpen] = useState(false);

  function savePlaythrough(
    newTitle: string,
    newPlatform: string,
    newStatus: string,
  ) {
    updateHandler(id, newTitle, newPlatform, newStatus);
    setIsOpen(false);
  }

  if (isOpen) {
    return (
      <li>
        <EditPlaythrough
          title={title}
          platform={platform}
          status={status}
          updateHandler={savePlaythrough}
        />
      </li>
    );
  } else {
    return (
      <li onClick={() => setIsOpen(true)}>
        {title} <span>{platform}</span>
        <span>dates</span>
      </li>
    );
  }
}
