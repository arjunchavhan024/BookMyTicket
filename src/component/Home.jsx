import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails"; // import EventDetails
import TicketModal from "./TicketModal"; // import TicketModal

const Home = () => {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState("Austin");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventUrl, setSelectedEventUrl] = useState(null); // Store URL for ticket modal

  const API_KEY = "1rpZFw1VGEj866iyBtA9v3RTH7mAvU9q";

  const fetchEvents = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?city=${encodeURIComponent(
          cityName
        )}&apikey=${API_KEY}`
      );
      const data = await response.json();
      const eventList = data._embedded?.events || [];
      setEvents(eventList);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(city); // Initial fetch

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchEvents(city);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Refresh when tab regains focus
    const handleFocus = () => fetchEvents(city);
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(city);
  };

  const filteredEvents = events.filter((event) => {
    if (!query && !date) return true;
    const titleMatch = event.name.toLowerCase().includes(query.toLowerCase());
    const dateMatch = date ? event.dates.start.localDate === date : true;
    return titleMatch && dateMatch;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input input-bordered w-full max-w-xs p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Search event title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs p-2 border rounded-md"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full max-w-xs p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {event.images?.[0]?.url && (
                <img
                  src={event.images[0].url}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p className="text-sm mb-1">
                  <strong>Date:</strong> {event.dates.start.localDate}
                </p>
                <p className="text-sm mb-1">
                  <strong>Time:</strong> {event.dates.start.localTime || "N/A"}
                </p>
                <p className="text-sm mb-4">
                  <strong>Venue:</strong>{" "}
                  {event._embedded?.venues?.[0]?.name || "N/A"}
                </p>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="bg-blue-600 text-white flex-1 text-center py-2 rounded hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEventUrl(event.url); // Open TicketModal only
                    }}
                    className="bg-green-600 text-white flex-1 py-2 rounded hover:bg-green-700 transition"
                  >
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No events found for "{city}".
        </p>
      )}

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {selectedEventUrl && (
        <TicketModal
          eventUrl={selectedEventUrl}
          onClose={() => setSelectedEventUrl(null)}
        />
      )}
    </div>
  );
};

export default Home;
