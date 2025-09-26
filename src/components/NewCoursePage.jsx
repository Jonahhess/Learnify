import { Container, Title, Button, Stack, Text } from "@mantine/core";

export default function NewCoursePage({ course, coursewares, onStart }) {
  return (
    <Container py="xl">
      <Title order={2} mb="md">
        {course.title}
      </Title>

      <Title order={4} mb="sm">
        Course Syllabus:
      </Title>
      <Stack mb="xl">
        {coursewares.length > 0 ? (
          coursewares.map((cw) => (
            <Text key={cw._id || cw.coursewareId} size="sm">
              • {cw.title}
            </Text>
          ))
        ) : (
          <Text c="dimmed">No coursewares available yet.</Text>
        )}
      </Stack>

      <Button color="green" onClick={onStart}>
        Start Course
      </Button>
    </Container>
  );
}
