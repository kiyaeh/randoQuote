import React, { useState, useEffect } from "react";
import "./random.css";
import { IoReload } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";

export const Random = () => {
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolf von Goethe",
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        if (response.ok) {
          const data = await response.json();
          const randomIndex = Math.floor(Math.random() * data.length);
          setQuote(data[randomIndex]);
        } else {
          throw new Error("Failed to fetch quotes");
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuote();
  }, []);

  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      window.location.href
    )}&title=${encodeURIComponent(
      quote.text + " - " + quote.author.split(",")[0]
    )}`;
    window.open(shareUrl, "_blank");
  };

  const getRandomQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (response.ok) {
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      } else {
        throw new Error("Failed to fetch quotes");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          <div className="author">-{quote.author.split(",")[0]}</div>
          <div className="icons">
            <IoReload onClick={getRandomQuote} className="icon" />
            <FaLinkedin onClick={shareOnLinkedIn} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
