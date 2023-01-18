import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);

    props.bookInterview(props.id, interview)
      .then(res => transition(SHOW))
      .catch(err => console.log(err));
  };

  const cancel = () => {
    transition(DELETE);

    props.cancelInterview(props.id)
      .then(res => transition(EMPTY))
      .catch(err => console.log(err));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVE && <Status message="Saving"/>}
        {mode === DELETE && <Status message="Deleting"/>}
        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete?"
            onCancel={ back }
            onConfirm={ cancel }
          />
        )}

    {mode === SHOW && (
      <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={ () => {transition(CONFIRM) } }
        />
      )}
       {mode === CREATE && (
      <Form 
      student={ "" }
      interviewer={ null }
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
        />
      )}

    </article>
  );
};