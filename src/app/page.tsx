"use client";

import StatusGroup from "./components/StatusGroup";
import type { Playthrough as TPlaythrough } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAll, create, update } from "./lib/apiclient";

export default function Page() {
  const [playthroughs, setPlaythroughs] = useState<TPlaythrough[]>([]);

  useEffect(getData, []);

  function getData() {
    getAll().then((res) => {
      if (res.ok) {
        res.json().then((json) => setPlaythroughs(json));
      }
    });
  }

  function createPlaythrough() {
    const title = (document.getElementById("ftitle") as HTMLInputElement).value;
    const platform = (document.getElementById("fplatform") as HTMLInputElement)
      .value;
    const data = { title, platform, status: "UNPLAYED" };

    create(data).then((response) => {
      if (response.ok) {
        response
          .json()
          .then((json) => setPlaythroughs([...playthroughs, json]));
      } else {
        alert("An error occurred");
        console.log(response);
      }
    });
  }

  function updatePlaythrough(
    id: number,
    title: string,
    platform: string,
    status: string,
    startedOn: Date,
    finishedOn: Date,
  ) {
    update(id, {
      title,
      platform,
      status,
      startedOn,
      finishedOn,
    }).then((response) => {
      if (response.ok) {
        const index = playthroughs.findIndex((x) => x.id === id);
        if (index !== -1) {
          const pt = playthroughs[index];
          pt.title = title;
          pt.platform = platform;
          pt.status = status;
          pt.startedOn = startedOn;
          pt.finishedOn = finishedOn;

          setPlaythroughs(playthroughs.toSpliced(index, 1, pt));
        } else {
          alert("An error occurred");
          console.log(response);
        }
      } else {
        alert("An error occurred");
        console.log(response);
      }
    });
  }

  return (
    <>
      <StatusGroup
        status="Unplayed"
        playthroughs={playthroughs}
        handleUpdate={updatePlaythrough}
      />
      <StatusGroup
        status="Unfinished"
        playthroughs={playthroughs}
        handleUpdate={updatePlaythrough}
      />
      <StatusGroup
        status="Finished"
        playthroughs={playthroughs}
        handleUpdate={updatePlaythrough}
      />

      <div>
        <input type="text" id="ftitle" name="ftitle" />
        <input type="text" id="fplatform" name="fplatform" />
        <input type="button" value="Save" onClick={createPlaythrough} />
      </div>
    </>
  );
}
