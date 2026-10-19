import { useEffect, useState } from "react";
import { FiGithub, FiMoon, FiSun, FiZap } from "react-icons/fi";

import ReadmeForm from "./components/ReadmeForm";
import MarkdownPreview from "./components/MarkdownPreview";
import History from "./components/History";
import api from "./services/api";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const loadHistory = async () => {
    try {
      const { data } = await api.get("/readme/history");
      setHistory(data.data);
    } catch (error) {
      console.log("History error:", error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#0b1120] text-white"
          : "min-h-screen bg-[#f5f7fb] text-slate-900"
      }
    >
      {/* Navbar */}
      <header
        className={`h-16 border-b flex items-center justify-between px-6 ${
          darkMode
            ? "bg-[#0f172a] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FiZap className="text-white" />
          </div>

          <div>
            <h1 className="font-bold text-lg tracking-tight">
              Readme<span className="text-indigo-500">AI</span>
            </h1>

            <p className="text-[11px] text-slate-400">
              AI-powered README generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <FiGithub />
            <span>Developer Workspace</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 transition"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-5 md:p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Page Heading */}
          <div className="mb-6">
            <p className="text-indigo-500 text-sm font-semibold mb-1">
              DEVELOPER TOOL
            </p>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Create a README
            </h2>

            <p className="text-slate-500 mt-2">
              Turn your project details into a professional README with AI.
            </p>
          </div>

          {/* Workspace */}
          <div className="grid grid-cols-1 xl:grid-cols-[260px_390px_minmax(0,1fr)] gap-5">
            {/* History */}
            <History
              history={history}
              refreshHistory={loadHistory}
              setMarkdown={setMarkdown}
              darkMode={darkMode}
            />

            {/* Form */}
            <ReadmeForm
              setMarkdown={setMarkdown}
              refreshHistory={loadHistory}
              darkMode={darkMode}
            />

            {/* Preview */}
            <MarkdownPreview markdown={markdown} darkMode={darkMode} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
