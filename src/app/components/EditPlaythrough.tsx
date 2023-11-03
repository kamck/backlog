import { Playthrough } from "@prisma/client";

interface EditPlaythroughProps {
  playthrough: Playthrough;
  updateHandler: (
    title: string,
    platform: string,
    status: string,
    startedOn: string,
    finishedOn: string,
  ) => void;
}

export default function EditPlaythrough({
  playthrough,
  updateHandler,
}: EditPlaythroughProps) {
  const getVal = (id: string) =>
    (document.getElementById(id) as HTMLInputElement).value;

  function updatePlaythrough() {
    updateHandler(
      getVal("ftitle"),
      getVal("fplatform"),
      getVal("fstatus"),
      getVal("fstart"),
      getVal("ffinish"),
    );
  }

  return (
    <li>
      <div className="playthroughedit">
        <input id="ftitle" name="ftitle" defaultValue={playthrough.title} />
        <input
          id="fplatform"
          name="fplatform"
          defaultValue={playthrough.platform}
        />
        <select id="fstatus" name="fstatus" defaultValue={playthrough.status}>
          <option value="UNPLAYED">Unplayed</option>
          <option value="UNFINISHED">Unfinished</option>
          <option value="FINISHED">Finished</option>
        </select>
        <input type="date" id="fstart" defaultValue={playthrough.startedOn} />
        <input type="date" id="ffinish" defaultValue={playthrough.finishedOn} />
        <div style={{ float: "none" }}>
          <button id="fsave" name="fsave" onClick={updatePlaythrough}>
            Save
          </button>
        </div>
      </div>
    </li>
  );
}
