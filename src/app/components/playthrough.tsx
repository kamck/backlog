import { useState } from "react";
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

  function savePlaythrough() {
    const newTitle = (document.getElementById("ftitle") as HTMLInputElement)
      .value;
    const newPlatform = (
      document.getElementById("fplatform") as HTMLInputElement
    ).value;
    const newStatus = (document.getElementById("fstatus") as HTMLInputElement)
      .value;

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
        <div className="playthroughedit">
          <input id="ftitle" name="ftitle" defaultValue={myTitle} />
          <input id="fplatform" name="fplatform" defaultValue={myPlatform} />
          <select id="fstatus" name="fstatus" defaultValue={myStatus}>
            <option value="UNPLAYED">Unplayed</option>
            <option value="UNFINISHED">Unfinished</option>
            <option value="FINISHED">Finished</option>
          </select>
          <div style={{ float: "none" }}>
            <button id="fsave" name="fsave" onClick={savePlaythrough}>
              Save
            </button>
          </div>
        </div>
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
