import React, { useState } from "react";

export default function StudyGuideApp() {
  const [inputText, setInputText] = useState("");
  const [sections, setSections] = useState([]);

  const handleGenerate = () => {
    const lines = inputText.split("\n").filter(Boolean);
    const newSections = [];

    lines.forEach((line) => {
      if (/Recognize:/i.test(line)) newSections.push({ type: "Recognize", content: line.replace(/Recognize:/i, "").trim() });
      else if (/Respond:/i.test(line)) newSections.push({ type: "Respond", content: line.replace(/Respond:/i, "").trim() });
      else if (/Rationale:/i.test(line)) newSections.push({ type: "Rationale", content: line.replace(/Rationale:/i, "").trim() });
      else newSections.push({ type: "Note", content: line });
    });

    setSections(newSections);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setInputText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-800">📘 Study Guide Formatter</h1>

      <div className="space-y-4">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />

        <textarea
          className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Paste your raw notes here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Format Study Guide
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <p className="font-semibold text-blue-600 mb-1">{section.type}</p>
            <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
