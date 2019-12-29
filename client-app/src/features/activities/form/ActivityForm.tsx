import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);

  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    clearActivity,
    activity: initialFormState
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

  const handleSubmitForm = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };

      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmitForm}>
            <Form.Input
              name='title'
              onChange={handleInputChange}
              placeholder='Title'
              value={activity.title}
            />
            <Form.TextArea
              name='description'
              onChange={handleInputChange}
              rows={2}
              placeholder='Description'
              value={activity.description}
            />
            <Form.Input
              name='category'
              onChange={handleInputChange}
              placeholder='Category'
              value={activity.category}
            />
            <Form.Input
              name='date'
              onChange={handleInputChange}
              type='datetime-local'
              placeholder='Date'
              value={activity.date}
            />
            <Form.Input
              name='city'
              onChange={handleInputChange}
              placeholder='City'
              value={activity.city}
            />
            <Form.Input
              name='venue'
              onChange={handleInputChange}
              placeholder='Venue'
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              onClick={() => history.push("/activities")}
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
