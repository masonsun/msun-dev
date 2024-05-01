import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownSample = () => {
  const md = `
    # Hello, *world*!
  `;
  return <ReactMarkdown>{md}</ReactMarkdown>;
};

export default MarkdownSample;
