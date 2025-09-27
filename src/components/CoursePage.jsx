import { useState } from "react";
import { Container, Title, Text, Stack, Button } from "@mantine/core";
import CoursewarePlayer from "./CoursewarePlayer.jsx";
import CourseSummary from "./CourseSummary.jsx";
import CoursewareList from "./CoursewareList.jsx";

export default function CoursePage({ course, coursewares, user, updateUser }) {
  const [selectedCourseware, setSelectedCourseware] = useState(null);
  const [finished, setFinished] = useState(false);

  // currentIndex = from user progress
  const currentCW = (user.myCurrentCoursewares || []).find(
    (cw) => String(cw.courseId) === String(course.courseId)
  );
  const currentIndex = currentCW ? currentCW.index : 0;

  function handleComplete(passed) {
    if (!passed) return;

    const completedCW = {
      courseId: selectedCourseware.courseId,
      coursewareId: selectedCourseware.coursewareId,
      title: selectedCourseware.title,
    };

    const updatedUser = { ...user };

    updatedUser.myCompletedCoursewares = [
      ...(user.myCompletedCoursewares || []),
      completedCW,
    ];

    updatedUser.myCurrentCoursewares = (user.myCurrentCoursewares || []).filter(
      (cw) => cw.coursewareId !== selectedCourseware.coursewareId
    );

    const currentIndex = coursewares.findIndex(
      (cw) => cw.coursewareId === selectedCourseware.coursewareId
    );
    const nextCW = coursewares[currentIndex + 1];

    if (nextCW) {
      updatedUser.myCurrentCoursewares.push({
        courseId: nextCW.courseId,
        coursewareId: nextCW.coursewareId,
        title: nextCW.title,
        index: nextCW.index,
      });
      setSelectedCourseware(nextCW);
    } else {
      setFinished(true);
    }

    updateUser(updatedUser);
  }

  if (finished) {
    return <CourseSummary course={course} coursewares={coursewares} />;
  }

  return (
    <Container py="xl">
      {!selectedCourseware ? (
        <>
          <Title order={2} mb="md">
            {course.title}
          </Title>

          {coursewares.length > 0 ? (
            <CoursewareList
              coursewares={coursewares}
              currentIndex={currentIndex}
              onSelect={setSelectedCourseware}
            />
          ) : (
            <Stack>
              <Text c="dimmed">No coursewares available for this course yet.</Text>
              <Button color="blue" variant="outline">
                Generate new courseware for this course
              </Button>
            </Stack>
          )}
        </>
      ) : (
        <CoursewarePlayer
          courseware={selectedCourseware}
          onComplete={handleComplete}
        />
      )}
    </Container>
  );
}
