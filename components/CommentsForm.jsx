import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        Post a Comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          placeholder="Comment"
          name="comment"
          ref={commentEl}
          className="w-full p-4 text-gray-800 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataEl}
            name="storeData"
            value="true"
            id="storeDate"
          />
          <label
            className="ml-2 text-gray-500 cursor-pointer"
            htmlFor="storeDate"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}

      <div className="mt-8">
        <button
          className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-pink-600 rounded-full shadow-lg cursor-pointer ease hover:bg-indigo-900"
          type="button"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>

        {showSuccessMessage && (
          <span className="float-right mt-3 text-sm font-light text-green-500">
            Comment Submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
