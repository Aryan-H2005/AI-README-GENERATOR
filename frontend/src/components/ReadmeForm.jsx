import { useState } from "react";
import {
  FiFileText,
  FiGithub,
  FiLayers,
  FiCode,
  FiSettings,
  FiZap,
  FiLoader,
} from "react-icons/fi";

import api from "../services/api";

export default function ReadmeForm({ setMarkdown, refreshHistory, darkMode }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    techStack: "",
    features: "",
    installation: "",
    usage: "",
    license: "MIT",
    githubUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateReadme = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/readme/generate", form);

      setMarkdown(data.readme);

      await refreshHistory();
    } catch (error) {
      console.log(error);
      alert("Failed to generate README");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-3.5 py-3 rounded-xl border outline-none transition-all text-sm ${
    darkMode
      ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white"
  }`;

  return (
    <section
      className={`rounded-2xl border shadow-sm overflow-hidden ${
        darkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      {/* Header */}
      <div
        className={`px-5 py-4 border-b ${
          darkMode ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FiFileText />
          </div>

          <div>
            <h3 className="font-semibold">Project Details</h3>
            <p className="text-xs text-slate-400">Tell AI about your project</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 space-y-5">
        {/* Project Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold mb-2">
            <FiLayers />
            Project Name
          </label>

          <input
            name="name"
            placeholder="e.g. Expense Tracker"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold mb-2 block">
            Description
          </label>

          <textarea
            name="description"
            rows="3"
            placeholder="What does your project do?"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold mb-2">
            <FiCode />
            Technology Stack
          </label>

          <input
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            value={form.techStack}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold mb-2">
            <FiGithub />
            GitHub Repository
          </label>

          <input
            name="githubUrl"
            placeholder="https://github.com/username/project"
            value={form.githubUrl}
            onChange={handleChange}
            className={inputClass}
          />

          <p className="text-[11px] text-slate-400 mt-2">
            Optional — automatically import repository information.
          </p>
        </div>

        {/* Features */}
        <div>
          <label className="text-xs font-semibold mb-2 block">Features</label>

          <textarea
            name="features"
            rows="3"
            placeholder="Authentication, charts, expense tracking..."
            value={form.features}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Installation */}
        <div>
          <label className="text-xs font-semibold mb-2 block">
            Installation
          </label>

          <input
            name="installation"
            placeholder="npm install"
            value={form.installation}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Usage */}
        <div>
          <label className="text-xs font-semibold mb-2 block">Usage</label>

          <input
            name="usage"
            placeholder="npm run dev"
            value={form.usage}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* License */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold mb-2">
            <FiSettings />
            License
          </label>

          <select
            name="license"
            value={form.license}
            onChange={handleChange}
            className={inputClass}
          >
            <option>MIT</option>
            <option>Apache 2.0</option>
            <option>GPL-3.0</option>
            <option>ISC</option>
          </select>
        </div>

        {/* Generate */}
        <button
          onClick={generateReadme}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Generating README...
            </>
          ) : (
            <>
              <FiZap />
              Generate README
            </>
          )}
        </button>
      </div>
    </section>
  );
}
