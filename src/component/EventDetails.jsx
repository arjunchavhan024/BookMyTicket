import React, { useState } from "react";

const EventDetails = ({ event, onClose }) => {
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    window.open(event.url, "_blank"); // Open ticket link
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
        >
          X
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          {event.images?.[0]?.url && (
            <img
              src={event.images[0].url}
              alt={event.name}
              className="w-full md:w-1/2 h-64 object-cover rounded-md"
            />
          )}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4">{event.name}</h2>
            <p className="text-lg mb-4">
              <strong>Date:</strong> {event.dates.start.localDate}
            </p>
            <p className="text-lg mb-4">
              <strong>Time:</strong> {event.dates.start.localTime || "N/A"}
            </p>
            <p className="text-lg mb-4">
              <strong>Venue:</strong>{" "}
              {event._embedded?.venues?.[0]?.name || "N/A"}
            </p>
            <p className="text-lg mb-4">
              <strong>Venue Address:</strong>{" "}
              {event._embedded?.venues?.[0]?.address?.line1 || "N/A"}
            </p>
            <p className="text-lg mb-4">
              <strong>City:</strong>{" "}
              {event._embedded?.venues?.[0]?.city?.name || "N/A"}
            </p>
            <p className="text-lg mb-4">
              <strong>Description:</strong> {event.info || "N/A"}
            </p>

            {!showEmailForm ? (
              <button
                onClick={() => setShowEmailForm(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Buy Tickets
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
