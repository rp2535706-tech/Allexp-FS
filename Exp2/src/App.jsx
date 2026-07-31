import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PostList from "./components/PostList";
import PostModal from "./components/PostModal";
import { initialPosts } from "./data/initialPosts.js";

export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const filteredPosts = posts.filter((post) => {
    const matchesPlatform =
      selectedPlatform === "All" || post.platform === selectedPlatform;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPlatform && matchesSearch;
  });

  const handleSavePost = (postData) => {
    if (postData.id) {
      setPosts(posts.map((p) => (p.id === postData.id ? postData : p)));
    } else {
      const newPost = {
        ...postData,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        likes: 0,
        comments: 0,
      };
      setPosts([newPost, ...posts]);
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="dashboard">
      <Sidebar
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => {
          setEditingPost(null);
          setIsModalOpen(true);
        }}
      />

      <div className="content">
        <Header posts={posts} />
        <PostList
          posts={filteredPosts}
          onEdit={(post) => {
            setEditingPost(post);
            setIsModalOpen(true);
          }}
          onDelete={handleDeletePost}
        />
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
        editingPost={editingPost}
      />
    </div>
  );
}
