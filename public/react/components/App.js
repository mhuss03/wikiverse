import React, { useEffect, useState } from "react";
import { PagesList } from "./PagesList";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import Article from "./Article";
import AddPage from "./AddPage";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [view, setView] = useState(false);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log("Oh no an error! ", err);
      }
    }

    fetchPages();
  }, [pages]);

  function handleView(slug) {
    setSlug(slug);
    setView(true);
  }

  let content;

  if (!view && !isAddingArticle) {
    content = (
      <main>
        <h1>WikiVerse</h1>
        <h2>An interesting 📚</h2>
        <PagesList pages={pages} changeView={handleView} />
        <button onClick={() => setIsAddingArticle(true)}>Add a Page</button>
      </main>
    );
  } else if (view && !isAddingArticle) {
    content = <Article resetView={() => setView(false)} slug={slug} />;
  } else if (isAddingArticle && !view) {
    content = <AddPage resetAddView={() => setIsAddingArticle(false)} />;
  }

  return content;
};
