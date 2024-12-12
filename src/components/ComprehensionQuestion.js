import React, { useState } from "react";

const ComprehensionQuestion = ({ onSave }) => {
  const [instructions, setInstructions] = useState("");
  const [passage, setPassage] = useState("");
  const [media, setMedia] = useState("");
  const [questions, setQuestions] = useState([]);
console.log(questions);
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const handleSave = () => {
    onSave({
      type: "Comprehension",
      instructions,
      passage,
      media,
      questions,
    });
  };

  const updateQuestionText = (index, text) => {
    setQuestions(
      questions.map((q, i) =>
        i === index ? { ...q, questionText: text } : q
      )
    );
  };

  const updateOption = (qIndex, oIndex, text) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, j) => (j === oIndex ? text : o)),
            }
          : q
      )
    );
  };

  const updateCorrectOption = (qIndex, oIndex) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIndex ? { ...q, correctOption: oIndex } : q
      )
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Comprehension Question</h3>
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <textarea
        placeholder="Passage"
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="Media URL"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="mb-4">
        <h4 className="font-bold">Questions</h4>
        {questions.map((question, qIdx) => (
          <div key={qIdx} className="mb-4 border p-2 rounded">
            <input
              type="text"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) => updateQuestionText(qIdx, e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <div className="mb-2">
              <h5 className="font-bold">Options</h5>
              {question.options.map((option, oIdx) => (
                <div key={oIdx} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${oIdx + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                    className="border p-2 flex-1 mr-2"
                  />
                  <input
                    type="radio"
                    name={`correctOption-${qIdx}`}
                    checked={question.correctOption === oIdx}
                    onChange={() => updateCorrectOption(qIdx, oIdx)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleAddQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
      </div>
      <button
        onClick={handleSave}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Save Question
      </button>
    </div>
  );
};

export default ComprehensionQuestion;
