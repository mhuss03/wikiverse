import React, { useState } from "react";
import apiURL from "../api";

export default function AddPage(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");

  async function handleSumbit(e) {
    e.preventDefault();
    const articleData = {
      title,
      content,
      name,
      email,
      tags,
    };

    const res = await fetch(`${apiURL}/wiki`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    const data = await res.json();

    props.resetAddView();
  }

  return (
    <div>
      <h1>WikiVerse</h1>
      <h2>Add a Page</h2>
      <form className="form" onSubmit={handleSumbit}>
        <input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Article Content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          placeholder="Author Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Author Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
        <button type="sumbit">Create Page</button>
      </form>
    </div>
  );
}
