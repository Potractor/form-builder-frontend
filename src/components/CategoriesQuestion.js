import React, { useState } from "react";

const CategoriesQuestion = ({ onSave }) => {
  const [question, setQuestion] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const handleAddCategory = () => {
    setCategories([...categories, ""]);
  };

  const handleAddItem = () => {
    setItems([...items, { text: "", category: "" }]);
  };

  const handleSave = () => {
    console.log(question);
    onSave({
      type: "Categorize",
      question,
      categories: categories.filter((cat) => cat.trim() !== ""),
      items: items.filter((item) => item.text.trim() !== ""),
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Categories Question</h3>
      <textarea
        placeholder="Enter the question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="mb-4">
        <h4 className="font-bold">Categories</h4>
        {categories.map((category, idx) => (
          <input
            key={idx}
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategories(
                categories.map((cat, i) => (i === idx ? e.target.value : cat))
              )
            }
            className="border p-2 w-full mb-2"
          />
        ))}
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>
      <div className="mb-4">
        <h4 className="font-bold">Items</h4>
        {items.map((item, idx) => (
          <div key={idx} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Item"
              value={item.text}
              onChange={(e) =>
                setItems(
                  items.map((it, i) =>
                    i === idx ? { ...it, text: e.target.value } : it
                  )
                )
              }
              className="border p-2 flex-1"
            />
            <select
              value={item.category}
              onChange={(e) =>
                setItems(
                  items.map((it, i) =>
                    i === idx ? { ...it, category: e.target.value } : it
                  )
                )
              }
              className="border p-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Item
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

export default CategoriesQuestion;
