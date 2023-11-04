"use client";

import { useEffect, useReducer } from "react";
import StatusGroup from "./components/StatusGroup";
import { getAll, create, update } from "./lib/apiclient";
import { playthroughReducer } from "./lib/playthroughReducer";

export default function Page() {
  const [playthroughs, dispatch] = useReducer(playthroughReducer, []);

  useEffect(getData, []);

  function getData() {
    getAll().then((res) => {
      if (res.ok) {
        res.json().then((json) => dispatch({ type: "load", data: json }));
      }
    });
  }

  function createPlaythrough() {
    const title = (document.getElementById("ftitle") as HTMLInputElement).value;
    const platform = (document.getElementById("fplatform") as HTMLInputElement)
      .value;
    const data = { title, platform };

    create(data).then((response) => {
      if (response.ok) {
        response
          .json()
          .then((json) => dispatch({ type: "add", newPlaythrough: json }));
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
        response
          .json()
          .then((json) => dispatch({ type: "update", updated: json }));
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
