import "./App.css";

import PlatformSelector from "./components/PlatformSelector";
import PostEditor from "./components/PostEditor";
import MediaUploader from "./components/MediaUploader";
import CharacterCounter from "./components/CharacterCounter";
import Preview from "./components/Preview";
import PublishButton from "./components/PublishButton";
import SaveDraftButton from "./components/SaveDraftButton";
import PublishedPosts from "./components/PublishedPosts";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  return (
    <div className="App">
      <h1>Social Media Post Creator</h1>

      <PlatformSelector />

      <br />

      <PostEditor />

      <br />

      <MediaUploader />

      <CharacterCounter />

      <Preview />

      <br />

      <SaveDraftButton />

      {"  "}

      <PublishButton />

      <PublishedPosts />

      <AnalyticsDashboard />
    </div>
  );
}

export default App;