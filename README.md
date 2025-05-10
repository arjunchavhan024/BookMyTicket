# 🎫 Event Explorer with Ticket Purchase Email Capture

This project is a React-based application that fetches live event data from the Ticketmaster API. It allows users to:

- Search events by **city**, **title**, and **date**
- View detailed event information
- Get redirected to ticket purchase pages **after providing their email**

## 🛠 Features

- 🔍 Event search functionality
- 📅 Date filtering and keyword matching
- 📄 Modal for viewing event details
- 📧 Email capture before redirecting to external ticket links
- 🌐 Live data from Ticketmaster API

## 📦 Technologies Used

- React
- Tailwind CSS (for UI)
- Ticketmaster Discovery API

## 🔧 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/event-explorer.git
   cd event-explorer
   npm install
   npm run dev
   ```

## Project Structure

bash
Copy
Edit
src/
├── components/
│ ├── Home.js # Main event list and search logic
│ ├── EventDetails.js # Modal showing event info and email form
│ └── TicketModal.js # Optional standalone ticket modal (if used)
└── App.js
