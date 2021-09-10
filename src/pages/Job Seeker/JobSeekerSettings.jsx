import React from "react";

export default function JobSeekerSettings() {
  const panels = [
    {
      key: "details",
      title: "Optional Details",
      content: {
        as: Form.Input,
        label: "Maiden Name",
        placeholder: "Maiden Name",
      },
    },
  ];

  return (
    <Segment>
      <Form>
        <Form.Group widths={2}>
          <Form.Input label="First Name" placeholder="First Name" />
          <Form.Input label="Last Name" placeholder="Last Name" />
        </Form.Group>
        <Accordion as={Form.Field} panels={panels} />

        <Button secondary>Sign Up</Button>
      </Form>
    </Segment>
  );
}
