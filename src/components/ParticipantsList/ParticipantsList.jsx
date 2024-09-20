import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadParticipants } from "../../redux/slices/participantsSlice";

const ParticipantsList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector(
    (state) => state.participants
  );

  useEffect(() => {
    dispatch(loadParticipants(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Participants</h1>
      <ul>
        {participants.map((participant) => (
          <li key={participant._id}>
            {participant.fullName} - {participant.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
