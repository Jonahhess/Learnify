import { useState, useEffect } from "react";
import { Container, Title, Button, Stack } from "@mantine/core";
import CoursewarePlayer from "./CoursewarePlayer.jsx";
import CourseSummary from "./CourseSummary.jsx";

export default function CoursePage({ course, coursewares, user, updateUser }) {
  const [selectedCourseware, setSelectedCourseware] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [finished, setFinished] = useState(false);

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  async function loadQuestions(cw) {
    const fetched = [];
    for (const q of cw.quiz) {
      const res = await fetch(`${API}/questions/${q.questionId}`, {
        credentials: "include",
      });
      const data = await res.json();
      fetched.push(data);
    }
    setQuestions(fetched);
  }

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
      loadQuestions(nextCW);
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
          <Stack>
            {coursewares.map((cw) => (
              <Button
                key={cw.coursewareId}
                variant="light"
                onClick={() => {
                  setSelectedCourseware(cw);
                  loadQuestions(cw);
                }}
              >
                {cw.title}
              </Button>
            ))}
          </Stack>
        </>
      ) : (
        <CoursewarePlayer
          courseware={selectedCourseware}
          questions={questions}
          onComplete={handleComplete}
        />
      )}
    </Container>
  );
}
