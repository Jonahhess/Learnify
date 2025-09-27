import { Card, Text, Progress } from "@mantine/core";
import { useAuth } from "../context/AuthContext.jsx";

export default function CourseCard({ course, coursewares, onClick, isNew }) {
  const { user } = useAuth();


  console.log(coursewares);
  console.log(course);
  
  // All coursewares that belong to this course
  const courseCoursewares = coursewares.filter(
    (cw) => String(cw.courseId) === String(course.courseId)
  );

  // currentIndex = from user progress
  const currentCW = (user.myCurrentCoursewares || []).find(
    (cw) => String(cw.courseId) === String(course.courseId) // ✅ not course._id
  );

  const total = coursewares.length || 1;
  const index = currentCW ? currentCW.index : 0;
  const progress = Math.round(((index) / total) * 100);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Text fw={500} size="lg" mb="sm">
        {course.title}
      </Text>

      {!isNew && (
        <>
          {currentCW ? (
            <Text size="sm" c="dimmed" mb="sm">
              Lesson {index + 1}: {currentCW.title}
            </Text>
          ) : (
            <Text size="sm" c="dimmed" mb="sm">
              Generate new courseware
            </Text>
          )}

          <Progress value={progress} label={`${progress}%`} />
        </>
      )}
    </Card>
  );
}
