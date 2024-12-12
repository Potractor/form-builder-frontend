import React, { useState } from "react";
import axios from "axios";
import CategoriesQuestion from "./CategoriesQuestion";
import SentenceQuestion from "./SentenceQuestion";
import ComprehensionQuestion from "./ComprehensionQuestion";

const FormBuilder = ({setFormId}) => {
  const [form, setForm] = useState({
    title: "",
    questions: [],
  });
  console.log(form);
  const handleAddQuestion = (type) => {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, { id: Date.now(), type, data: {} }],
    }));
  };

  const handleSaveQuestion = (id, data) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, data: { ...q.data, ...data } } : q
      ),
    }));
  };
  

  const handleDeleteQuestion = (id) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };
  const handleSubmitForm = async () => {
    const formattedQuestions = form.questions.map((q) => {
      const { data } = q;
  
      if (data.type === "Comprehension") {
        return {
          type: data.type,
          passage: data.passage,
          options: [], 
          media: data.media || "",
          instructions: data.instructions || "",
          question: data.passage,
          questions: data.questions.map((qItem) => ({
            questionText: qItem.questionText,
            options: qItem.options.map((opt, idx) => ({
              text: opt,
              isCorrect: idx === qItem.correctOption,
            })),
            correctOption: qItem.correctOption,
          })),
        };
      } else if (data.type === "Sentence") {
        return {
          type: data.type,
          question: data.question,
          blanks: data.options,
          feedback: data.feedback,
        };
      } else if (data.type === "Categorize") {
        return {
            type: data.type,
            question: data.question || "Default question text",
            options: data.items.map((item) => ({
              text: item.text,
              categories: item.category ? [item.category] : [],
            })),
            categories: data.categories || [],
          };
    
      }
      return data;
    });
  
    try {
      const response = await axios.post("https://form-builder-backend-ptde.onrender.com/forms", {
        title: form.title,
        questions: formattedQuestions,
      });
      console.log("Form created:", response.data);
      setFormId(response.data.formId);
    } catch (error) {
      console.error("Error creating form:", error.response?.data || error);
      alert(error.response?.data?.message);
    }
  };
  

  return (
    <div className="bg-white p-4 shadow rounded">
      <input
        type="text"
        placeholder="Form Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 mb-4 w-full"
      />
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleAddQuestion("Categorize")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Categories Question
        </button>
        <button
          onClick={() => handleAddQuestion("Sentence")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Sentence Question
        </button>
        <button
          onClick={() => handleAddQuestion("Comprehension")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Comprehension Question
        </button>
      </div>

      <div className="space-y-4">
        {form.questions.map((question) => (
          <div key={question.id} className="p-4 border rounded">
            {question.type === "Categorize" && (
              <CategoriesQuestion
                onSave={(data) => handleSaveQuestion(question.id, data)}
              />
            )}
            {question.type === "Sentence" && (
              <SentenceQuestion
                onSave={(data) => handleSaveQuestion(question.id, data)}
              />
            )}
            {question.type === "Comprehension" && (
              <ComprehensionQuestion
                onSave={(data) => handleSaveQuestion(question.id, data)}
              />
            )}
            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete Question
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handleSubmitForm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Create Form
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
