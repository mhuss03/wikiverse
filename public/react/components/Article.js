import React, { useEffect, useState } from "react";
import apiURL from "../api";

export default function Article(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const response = await fetch(`${apiURL}/wiki/${props.slug}`);
        const articleData = await response.json();
        setData(articleData);
      } catch (err) {
        console.log("Oh no an error! ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleDelete() {
    const response = await fetch(`${apiURL}/wiki/${props.slug}`, {
      method: "DELETE",
    });
    const data = await response.json();
    props.resetView();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <div>
        <h2>Author: </h2>
        <p>{data.author.name}</p>
      </div>
      <div>
        <h2>Published: </h2>
        <p>{new Date(data.createdAt).toLocaleDateString()}</p>
      </div>
      <div>
        <h2>Tags: </h2>
        {data.tags.map((tag) => (
          <p>{tag.name}</p>
        ))}
      </div>
      <button onClick={handleDelete}>Delete Article</button>
      <button onClick={props.resetView}>Back to Wiki List</button>
    </div>
  );
}
