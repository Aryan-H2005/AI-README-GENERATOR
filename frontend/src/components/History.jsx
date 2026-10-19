import { useState } from "react";
import { FiClock, FiSearch, FiTrash2, FiFileText } from "react-icons/fi";

import api from "../services/api";

export default function History({
  history,
  refreshHistory,
  setMarkdown,
  darkMode,
}) {
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((item) =>
    item.projectName.toLowerCase().includes(search.toLowerCase()),
  );

  const remove = async (id) => {
    try {
      await api.delete(`/readme/${id}`);
      refreshHistory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      className={`rounded-2xl border shadow-sm h-fit xl:sticky xl:top-5 ${
        darkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <FiClock />
          </div>

          <div>
            <h3 className="font-semibold">History</h3>

            <p className="text-xs text-slate-400">
              {history.length} saved README
              {history.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-slate-400 text-sm" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-9 pr-3 text-xs outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* History Items */}
      <div className="p-3 max-h-162.5 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-10">
            <FiFileText className="mx-auto text-2xl text-slate-300 mb-3" />

            <p className="text-sm text-slate-400">No README history</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item._id}
              className="group p-3 rounded-xl hover:bg-indigo-50 transition cursor-pointer mb-1"
              onClick={() => setMarkdown(item.markdown)}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <FiFileText className="text-sm" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">
                    {item.projectName}
                  </p>

                  <p className="text-[11px] text-slate-400 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(item._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
