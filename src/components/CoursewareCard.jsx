import { Card, Text, Badge } from "@mantine/core";

export default function CoursewareCard({ courseware }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: "pointer" }}>
      <Text fw={500} size="md" mb="xs">
        {courseware.title}
      </Text>
      <Text size="sm" c="dimmed" mb="sm">
        {courseware.description || "No details"}
      </Text>
      {courseware.completed ? (
        <Badge color="green">Completed</Badge>
      ) : (
        <Badge color="blue">In Progress</Badge>
      )}
    </Card>
  );
}
