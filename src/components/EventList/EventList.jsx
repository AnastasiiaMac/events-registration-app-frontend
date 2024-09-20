import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../services/api";
import css from "./EventList.module.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 8;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true); // Show loading state
        const data = await fetchEvents(currentPage, perPage); // Fetch paginated events
        setEvents(data.data); // Update events state
        setTotalPages(data.totalPages); // Update total pages state
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents(); // Call the function to load events
  }, [currentPage]); // Run this effect when currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Move to the next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id} className={css.eventCard}>
            <h2 className={css.eventTitle}>{event.title}</h2>
            <p className={css.eventDescription}>{event.description}</p>
            <div className={css.eventContainer}>
              <p className={css.eventDate}>
                Date: {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className={css.eventOrganizer}>Organizer: {event.organizer}</p>
            </div>
            <div className={css.linkContainer}>
              <Link to={`/events/${event._id}/register`} className={css.button}>
                Register
              </Link>
              <Link
                to={`/events/${event._id}/participants`}
                className={css.button}
              >
                View Participants
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className={css.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={css.button}
        >
          Previous
        </button>
        <span className={css.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={css.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventList;
