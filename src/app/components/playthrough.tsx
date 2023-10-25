interface PlaythroughProps {
  title: string;
  platform: string;
}

export default function Playthrough({ title, platform }: PlaythroughProps) {
  return (
    <li>
      {title} <span>{platform}</span><span>dates</span>
    </li>
  );
}
