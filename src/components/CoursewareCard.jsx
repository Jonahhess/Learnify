import { Card, Text } from "@mantine/core";

export default function CoursewareCard({ courseware, index, currentIndex, onClick }) {
  const isFinished = index < currentIndex;
  const isCurrent = index === currentIndex;
  const isFuture = index > currentIndex;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: isCurrent ? "pointer" : "default",
        backgroundColor: isFinished ? "#e6ffed" : "white", 
        borderColor: isFinished ? "#9ae6b4" : isCurrent ? "#3182ce" : "#e0e0e0",
        opacity: isFuture ? 0.6 : 1, 
        pointerEvents: isCurrent ? "auto" : "none", 
      }}
      onClick={isCurrent ? onClick : undefined}
    >
      <Text fw={500}>
        {courseware.title}
      </Text>
    </Card>
  );
}
