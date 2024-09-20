import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./EventList/EventList";
import EventRegistration from "./EventRegistration/EventRegistration";
import ParticipantsList from "./ParticipantsList/ParticipantsList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id/register" element={<EventRegistration />} />
        <Route path="/events/:id/participants" element={<ParticipantsList />} />
      </Routes>
    </Router>
  );
};

export default App;
