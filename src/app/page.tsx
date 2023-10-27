'use client';

import Playthrough from "./components/playthrough";
import { useEffect, useState } from "react";

export default function Page() {
  const myData = [
    {
      title: "one",
      platform: "PS1",
      status: "unplayed",
      startDate: null,
      endDate: null,
    },
    {
      title: "two",
      platform: "NSW",
      status: "unplayed",
      startDate: null,
      endDate: null,
    },
  ];

  const [playthroughs, setPlaythroughs] = useState([]);

  useEffect(getData, []);

  function getData() {
    fetch("/api").then(res => {
      if (res.ok) {
        res.json().then(json => setPlaythroughs(json));
      }
    });
  }

  function sendData() {
    const title = document.getElementById("ftitle").value;
    const platform = document.getElementById("fplatform").value;
    const data = { title, platform }

    fetch("/api", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then(response => {
      if (response.ok) {
	setPlaythroughs([...playthroughs, data]);
      }
    });
  }

  return (
    <>
      <div>
	<h1>Unplayed</h1>
	<ul>
	  {playthroughs.map(d =>
	    <Playthrough key={d.id} title={d.title} platform={d.platform} />
	  )}
	</ul>
      </div>

      <div>
        <input type="text" id="ftitle" name="ftitle" />
        <input type="text" id="fplatform" name="fplatform" />
        <input type="button" value="Save" onClick={sendData} />
      </div>
    </>
  );
}
