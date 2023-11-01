import { useState } from "react";

interface NewPlaythroughProps {
  title: string;
  platform: string;
  status: string;
  updateHandler: (title: string, platform: string, status: string) => void;
}

export default function NewPlaythrough({
  title,
  platform,
  status,
  updateHandler,
}: NewPlaythroughProps) {
  function updatePlaythrough() {
    const myTitle = (document.getElementById("ftitle") as HTMLInputElement)
      .value;
    const myPlatform = (
      document.getElementById("fplatform") as HTMLInputElement
    ).value;
    const myStatus = (document.getElementById("fstatus") as HTMLInputElement)
      .value;

    updateHandler(myTitle, myPlatform, myStatus);
  }

  return (
    <li>
      <div className="playthroughedit">
        <input id="ftitle" name="ftitle" defaultValue={title} />
        <input id="fplatform" name="fplatform" defaultValue={platform} />
        <select id="fstatus" name="fstatus" defaultValue={status}>
          <option value="UNPLAYED">Unplayed</option>
          <option value="UNFINISHED">Unfinished</option>
          <option value="FINISHED">Finished</option>
        </select>
        <div style={{ float: "none" }}>
          <button id="fsave" name="fsave" onClick={updatePlaythrough}>
            Save
          </button>
        </div>
      </div>
    </li>
  );
}
