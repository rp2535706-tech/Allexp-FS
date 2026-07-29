import { useSelector } from "react-redux";

function PlatformList() {
  const platforms = useSelector(
    (state) => state.platforms.list
  );

  return (
    <div>
      <h2>Platforms</h2>

      {platforms.map((platform) => (
        <p key={platform}>{platform}</p>
      ))}
    </div>
  );
}

export default PlatformList;