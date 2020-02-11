// this is taken from https://stackblitz.com/edit/react-highlighted-markdown?file=highlighted-markdown.tsx

import React, { useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

export default function HighlightedMarkdown({ children }) {
  const rootRef = useRef();

  useEffect(() => {
    rootRef.current.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  }, [children]);

  return (
    <div ref={rootRef}>
      <Markdown>{children}</Markdown>
    </div>
  );
}
