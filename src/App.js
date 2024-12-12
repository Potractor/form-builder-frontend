import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormViewer from "./components/FormViewer";
import SuccessPage from "./components/SuccessPage";
function App() {
  const [formId, setFormId] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Form Builder</h1>
        <Routes>
          <Route
            path="/"
            element={<FormBuilder setFormId={setFormId} />}
          />
          <Route
            path="/form/:formId"
            element={<FormViewer />}
          />
           <Route path="/success" element={<SuccessPage />} />
        </Routes>
        {formId && (
          <div className="text-center mt-4">
            <Link
              to={`/form/${formId}`}
              target="_blank"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Open Form in New Page
            </Link>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
