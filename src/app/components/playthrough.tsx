import { useState } from 'react';

interface PlaythroughProps {
  title: string;
  platform: string;
}

export default function Playthrough({ id, title, platform }: PlaythroughProps) {
  const [isOpen, setIsOpen] = useState(false);

  function getData() {
    return {
      title: document.getElementById('ftitle').value,
      platform,
    }
  }

  function savePlaythrough() {
    fetch(`/api/${id}`, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(getData())
    }).then(response => console.log(response));
  }

  if (isOpen) {
    return (
      <li>
        <div className="playthroughedit">
          <input id="ftitle" name="ftitle" defaultValue={title} />
          <button id="fsave" name="fsame" value="Save" onClick={savePlaythrough}>Save</button>
        </div>
      </li>
    );
  } else {
    return (
      <li onClick={() => setIsOpen(true)} >
        {title} <span>{platform}</span><span>dates</span>
      </li>
    );
  }
}
