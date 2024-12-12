import React, { useState, useRef } from "react";

const SentenceQuestion = ({ onSave }) => {
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const contentRef = useRef(null);

  const handleUnderline = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
  
    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
  
    if (selectedText.length > 0) {
      setOptions((prev) => [...new Set([...prev, selectedText])]);
  
      range.deleteContents();
      const placeholder = document.createTextNode("___");
      range.insertNode(placeholder);
  
      selection.removeAllRanges();
    }
  };
  
  const handleSave = () => {
    console.log(contentRef.current?.innerHTML);
    console.log(options);
    onSave({
      type: "Sentence",
      question: contentRef.current?.innerHTML || "",
      options,
      feedback,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Sentence Question</h3>
      <div
        ref={contentRef}
        contentEditable
        className="border p-2 w-full mb-4 bg-white rounded"
        placeholder="Type the sentence here"
        style={{ minHeight: "100px" }}
      ></div>
      <button
        onClick={handleUnderline}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Underline Selected Text
      </button>
      <div className="mb-4">
        <h4 className="font-bold">Options</h4>
        {options.map((option, idx) => (
          <div key={idx} className="mb-2">
            {option}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Save Question
      </button>
    </div>
  );
};

export default SentenceQuestion;
