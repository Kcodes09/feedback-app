import { HandThumbUpIcon, ChatBubbleLeftRightIcon, ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [currentfeed, setCurrentfeed] = useState("");
  const [error, setError] = useState("");

  const API_URL = 'https://feedback-app-glh8.onrender.com';

  useEffect(() => {
    fetch(`${API_URL}/api/feedbacks`)
      .then((res) => res.json())
      .then(setFeedbacks)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !currentfeed.trim()) {
      alert("Name and Feedback cannot be empty");
      return;
    }

    const newFeedback = {
      name: name.trim(),
      message: currentfeed.trim(),
    };

    try {
      const res = await fetch(`${API_URL}/api/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback),
      });

      if (!res.ok) throw new Error('Failed to submit');

      const saved = await res.json();
      setFeedbacks([saved, ...feedbacks]);
      setName('');
      setCurrentfeed('');
      setError('');
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="h-7 w-7" />
          Submit Your Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full p-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
            placeholder="Your Feedback"
            rows={4}
            value={currentfeed}
            onChange={(e) => setCurrentfeed(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-700"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="max-w-xl mx-auto mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Feedback</h2>
        {feedbacks.length === 0 && <p className="text-gray-500">No feedback yet.</p>}
        {feedbacks.map((fb, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded shadow flex flex-col space-y-1"
          >
            <p className="font-medium text-blue-700">{fb.name}</p>
            <p className="text-gray-600">{fb.message}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <ClockIcon className="h-4 w-4 mr-1" />
              {new Date(fb.timestamp).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
