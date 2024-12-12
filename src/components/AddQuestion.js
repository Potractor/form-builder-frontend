import React, { useState } from "react";

const AddQuestion = ({ onAdd }) => {
   const [type, setType] = useState("Categorize");
   const [question, setQuestion] = useState("");
   const [options, setOptions] = useState("");

   const handleAdd = () => {
       const newQuestion = {
           type,
           question,
           options: type === "Categorize" ? options.split(",") : undefined,
       };
       onAdd(newQuestion);
       setQuestion("");
       setOptions("");
   };

   return (
       <div className="mb-4">
           <h3 className="font-bold mb-2">Add a Question</h3>
           <select
               value={type}
               onChange={(e) => setType(e.target.value)}
               className="border p-2 w-full mb-2"
           >
               <option value="Categorize">Categorize</option>
               <option value="Cloze">Cloze</option>
               <option value="Comprehension">Comprehension</option>
           </select>
           <input
               type="text"
               className="border p-2 w-full mb-2"
               placeholder="Enter question"
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
           />
           {type === "Categorize" && (
               <input
                   type="text"
                   className="border p-2 w-full mb-2"
                   placeholder="Enter options (comma-separated)"
                   value={options}
                   onChange={(e) => setOptions(e.target.value)}
               />
           )}
           <button
               onClick={handleAdd}
               className="bg-green-500 text-white px-4 py-2 rounded"
           >
               Add Question
           </button>
       </div>
   );
};

export default AddQuestion;
