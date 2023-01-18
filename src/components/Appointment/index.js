import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const cancel = () => {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete your appointment?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition(CONFIRM) }}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          student={""}
          interviewer={null}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING)
            props.bookInterview(props.id, save(name, interviewer))
              .then(() => transition(SHOW))
          }}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment, please try again."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment, please try again."
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  );
};