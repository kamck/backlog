'use client';

import Playthrough from "./components/playthrough";
import { useState } from "react";

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

  const [playthroughs, setPlaythroughs] = useState(myData);

  function sendData() {
    const title = document.getElementById("ftitle").value;

    fetch("/api", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ message: title })
    }).then(response => {
      if (response.ok) {
	setPlaythroughs([...playthroughs, { title }]);
      }
    });
  }

  return (
    <>
      <div>
	<h1>Unplayed</h1>
	<ul>
	  {playthroughs.map(d =>
	    <Playthrough key={d.title} title={d.title} platform={d.platform} />
	  )}
	</ul>
      </div>

      <div>
        <input type="text" id="ftitle" name="ftitle" />
        <input type="button" value="Save" onClick={sendData} />
      </div>
    </>
  );
}
