import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiCopy, FiDownload, FiFileText, FiCheck } from "react-icons/fi";
import { useState } from "react";

import "github-markdown-css/github-markdown.css";

export default function MarkdownPreview({ markdown, darkMode }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(markdown);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const download = () => {
    const blob = new Blob([markdown], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "README.md";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section
      className={`rounded-2xl border shadow-sm overflow-hidden min-h-175 ${
        darkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      {/* Preview Header */}
      <div
        className={`h-16 px-5 border-b flex items-center justify-between ${
          darkMode ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <FiFileText />
          </div>

          <div>
            <h3 className="font-semibold">README Preview</h3>

            <p className="text-xs text-slate-400">Live Markdown rendering</p>
          </div>
        </div>

        {markdown && (
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium hover:bg-slate-50 transition"
            >
              {copied ? <FiCheck /> : <FiCopy />}

              {copied ? "Copied" : "Copy"}
            </button>

            <button
              onClick={download}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
            >
              <FiDownload />
              Download
            </button>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="p-6 md:p-8 min-h-157.5">
        {!markdown ? (
          <div className="h-137.5 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient from-indigo-50 to-purple-100 flex items-center justify-center mb-5">
              <FiFileText className="text-3xl text-indigo-500" />
            </div>

            <h3 className="text-lg font-semibold mb-2">
              Your README will appear here
            </h3>

            <p className="text-sm text-slate-400 max-w-sm">
              Enter your project details and click Generate README to create
              professional documentation using AI.
            </p>
          </div>
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  );
}
