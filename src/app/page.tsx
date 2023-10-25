import Playthrough from './components/playthrough';

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

  return (
    <>
      <div>
	<h1>Unplayed</h1>
	<ul>
	  {myData.map(d => <Playthrough title={d.title} platform={d.platform} />)}
	</ul>
      </div>
    </>
  );
}
