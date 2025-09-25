import { Container, Title, List } from "@mantine/core";

export default function CourseSummary({ course, coursewares }) {
  return (
    <Container py="xl">
      <Title order={2} mb="md">🎉 Congratulations! You finished {course.title}</Title>
      <Title order={4} mb="sm">Course Outline:</Title>
      <List spacing="sm">
        {coursewares.map((cw) => (
          <List.Item key={cw.courseId || cw._id}>{cw.title}</List.Item>
        ))}
      </List>
    </Container>
  );
}
