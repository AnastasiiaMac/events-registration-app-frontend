import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadParticipants } from "../../redux/slices/participantsSlice";
import css from "./ParticipantsList.module.css";

const ParticipantsList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector(
    (state) => state.participants
  );

  useEffect(() => {
    dispatch(loadParticipants(id)); // Fetch participants for the event
  }, [dispatch, id]);

  // Handle loading state
  if (loading) return <p className={css.loading}>Loading participants...</p>;

  // Handle error state (404 or other errors)
  if (error) return <p className={css.error}>Error: {error}</p>;

  // If participants are undefined or not an array, set it to an empty array
  const safeParticipants = participants || [];

  return (
    <div className={css.container}>
      <h1 className={css.title}>Awesome Event Participants</h1>

      {/* Check if there are no participants */}
      {safeParticipants.length === 0 ? (
        <p className={css.noParticipants}>
          No participants found for this event.
        </p>
      ) : (
        <ul className={css.participantList}>
          {safeParticipants.map((participant) => (
            <li key={participant._id} className={css.participantItem}>
              {participant.fullName} - {participant.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParticipantsList;
