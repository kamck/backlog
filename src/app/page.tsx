"use client";

import Playthrough from "./components/playthrough";
import { useEffect, useState } from "react";
import { getAll, create } from "./lib/apiclient";

export default function Page() {
  const [playthroughs, setPlaythroughs] = useState([]);

  useEffect(getData, []);

  function getData() {
    getAll().then((res) => {
      if (res.ok) {
        res.json().then((json) => setPlaythroughs(json));
      }
    });
  }

  function sendData() {
    const title = (document.getElementById("ftitle") as HTMLInputElement).value;
    const platform = (document.getElementById("fplatform") as HTMLInputElement)
      .value;
    const data = { title, platform };

    create(data).then((response) => {
      if (response.ok) {
        setPlaythroughs([...playthroughs, data]);
      } else {
        alert("An error occurred");
        console.log(response);
      }
    });
  }

  const buildList = (status: string) =>
    playthroughs
      .filter((p) => p.status === status)
      .map((d) => (
        <Playthrough
          key={d.id}
          id={d.id}
          title={d.title}
          platform={d.platform}
          status={d.status}
        />
      ));

  return (
    <>
      <div>
        <h1>Unplayed</h1>
        <ul>{buildList("UNPLAYED")}</ul>
      </div>

      <div>
        <h1>Unfinished</h1>
        <ul>{buildList("UNFINISHED")}</ul>
      </div>

      <div>
        <h1>Finished</h1>
        <ul>{buildList("FINISHED")}</ul>
      </div>

      <div>
        <input type="text" id="ftitle" name="ftitle" />
        <input type="text" id="fplatform" name="fplatform" />
        <input type="button" value="Save" onClick={sendData} />
      </div>
    </>
  );
}
