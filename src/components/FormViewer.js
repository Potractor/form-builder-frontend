import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";


const FormViewer = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://form-builder-backend-ptde.onrender.com/forms/${formId}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId]);

  const handleSubmitResponses = async () => {

    const transformedResponses = Object.values(responses).reduce((acc, response) => {
        const { questionId, ...rest } = response; 
        acc[questionId] = rest;                  
        return acc;
      }, {});
      
  
    try {
      const response = await axios.post("https://form-builder-backend-ptde.onrender.com/responses", {
        formId: form._id,
        responses: transformedResponses,
      });
      navigate("/success");

    } catch (error) {
      console.error("Error submitting responses:", error);
    }
  };
  
  if (!form) return <p>Loading form...</p>;

  return (
    <div className="bg-white p-4 shadow rounded mt-8">
      <h2 className="text-xl font-bold">{form.title}</h2>
      {form.questions.map((question, idx) => (
        <div key={question._id} className="mb-6">
{question.type === "Comprehension" && (
  <div>
    {question.media && (
      <img src={question.media} alt="Comprehension Media" className="mb-4 w-full" />
    )}
    
    {question.instructions && (
      <p className="mb-2 italic">{question.instructions}</p>
    )}

    <p className="mb-4">{question.passage}</p>

    {/* Display the options */}
    {question.questions.map((qItem, idx) => (
      <div key={qItem._id}>
        <p className="font-semibold">{qItem.questionText}</p>
        
        {qItem.options.map((option) => (
          <label key={option._id} className="block">
            <input
              type="radio"
              name={`question-${idx}`}
              value={option.text}
              onChange={(e) =>
                setResponses((prevResponses) => ({
                  ...prevResponses,
                  [question._id]: { ...prevResponses[question._id], [idx]: e.target.value,questionId: question._id },
                  
                }))
              }
              
              className="mr-2"
            />
            {option.text}
          </label>
        ))}
      </div>
    ))}
  </div>
)}

{question.type === "Sentence" && (
  <div>
    <p className="mb-4 font-bold">{question.question}</p>

    {/* Draggable Answers */}
    <div className="flex gap-2 mb-4">
      {question.blanks.map((option, optionIdx) => (
        <div
          key={optionIdx}
          className="border rounded p-2 bg-gray-200 cursor-pointer"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", option)}
        >
          {option}
        </div>
      ))}
    </div>

    {/* Sentence with Droppable Blanks */}
    <div className="flex gap-2 flex-wrap">
      {question.question.split(" ").map((word, wordIdx) => {
        if (word === "___" || word === '___.') {
          return (<div>
            <div
              key={wordIdx}
              className="border-dashed border-2 rounded p-2 w-24 h-10 flex justify-center items-center"
              onDrop={(e) => {
                const answer = e.dataTransfer.getData("text/plain");
                setResponses({
                  ...responses,
                  [idx]: {
                    ...responses[idx],

                    [wordIdx]: answer,
                    questionId: question._id
                  },
                });
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {responses[idx]?.[wordIdx] || ""}
            </div>
            </div>
          );
        }
        return (
          <span key={wordIdx} className="flex items-center">
            {word}
          </span>
        );
      })}
    </div>
  </div>
)}
{question.type === "Categorize" && (
  <div className="flex gap-4">
    {question.categories.map((category, catIdx) => (
      <div key={category} className="flex flex-col">
        <p className="font-semibold">{category}</p>
        
        <div
          className="border rounded p-4 w-48 bg-gray-100"
          onDrop={(e) => {
            const option = e.dataTransfer.getData("text/plain");
            if (responses[idx]?.[category]?.includes(option)) return;

            setResponses({
              ...responses,
              [idx]: {
                ...responses[idx],
                [category]: [...(responses[idx]?.[category] || []), option],
                unassigned: (responses[idx]?.unassigned || question.options).filter(opt => opt.text !== option),
                questionId: question._id
              },
            });
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {(responses[idx]?.[category] || []).map((option, optIdx) => (
            <div key={`${option}-${optIdx}`} className="border rounded p-2 bg-gray-200 mt-2">
              {option}
            </div>
          ))}
        </div>
      </div>
    ))}

    <div
      className="border rounded p-4 w-48 bg-gray-50"
      onDrop={(e) => {
        const option = e.dataTransfer.getData("text/plain");

        if (responses[idx]?.unassigned?.includes(option)) return;

        setResponses({
          ...responses,
          [idx]: {
            ...responses[idx],
            unassigned: (responses[idx]?.unassigned || question.options).filter(opt => opt.text !== option),
            questionId: question._id
          },
        });
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className="font-semibold">Unassigned</p>
      {(responses[idx]?.unassigned || question.options).map((option, optIdx) => (
        <div
          key={`${option.text}-${optIdx}`}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", option.text)}
          className="border rounded p-2 bg-gray-200 mt-2"
        >
          {option.text}
        </div>
      ))}
    </div>
  </div>
)}


        </div>
      ))}
      <button
        onClick={handleSubmitResponses}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Responses
      </button>
    </div>
  );
};

export default FormViewer;
