import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";


import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(res => transition(SHOW))
      .catch(err => console.log(err));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* {mode === SAVE && <Status message="Saving"/>} */}
    {mode === SHOW && (
      <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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