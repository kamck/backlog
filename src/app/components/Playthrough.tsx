import { useState } from "react";
import EditPlaythrough from "./EditPlaythrough";
import { update } from "../lib/apiclient";

interface PlaythroughProps {
  id: number;
  title: string;
  platform: string;
  status: string;
}

export default function Playthrough({
  id,
  title,
  platform,
  status,
}: PlaythroughProps) {
  const [myTitle, setMyTitle] = useState(title);
  const [myPlatform, setMyPlatform] = useState(platform);
  const [myStatus, setMyStatus] = useState(status);
  const [isOpen, setIsOpen] = useState(false);

  function savePlaythrough(
    newTitle: string,
    newPlatform: string,
    newStatus: string,
  ) {
    update(id, {
      title: newTitle,
      platform: newPlatform,
      status: newStatus,
    }).then((response) => {
      if (response.ok) {
        setIsOpen(false);
        setMyTitle(newTitle);
        setMyPlatform(newPlatform);
        setMyStatus(newStatus);
      } else {
        alert("An error occurred");
        console.log(response);
      }
    });
  }

  if (isOpen) {
    return (
      <li>
        <EditPlaythrough
          title={myTitle}
          platform={myPlatform}
          status={myStatus}
          updateHandler={savePlaythrough}
        />
      </li>
    );
  } else {
    return (
      <li onClick={() => setIsOpen(true)}>
        {myTitle} <span>{myPlatform}</span>
        <span>dates</span>
      </li>
    );
  }
}
