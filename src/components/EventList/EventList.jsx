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
  const [sortBy, setSortBy] = useState("title"); // Default sort by title
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  const perPage = 8;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents(currentPage, perPage, sortBy, sortOrder);
        setEvents(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [currentPage, sortBy, sortOrder]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Events</h1>

      {/* Sorting Dropdowns */}
      <div className={css.sortingContainer}>
        <label className={css.label}>Sort By:</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className={css.select}
        >
          <option value="title">Title</option>
          <option value="eventDate">Event Date</option>
          <option value="organizer">Organizer</option>
        </select>

        <label className={css.label}>Order:</label>
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className={css.select}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

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
