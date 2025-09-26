import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Loader,
  Center,
  Button,
  Group,
} from "@mantine/core";
import { useAuth } from "../context/AuthContext.jsx";
import CourseList from "./CourseList.jsx";
import CoursewarePage from "./CoursewarePage.jsx";
import CoursePage from "./CoursePage.jsx";
import NewCoursePage from "./NewCoursePage.jsx"; // ✅ new component
import { getCourses, getCoursewares } from "../api/courses.js";
import { startCourse } from "../api/users.js";

export default function LearnSystem() {
  const { user, reloadUser } = useAuth();
  const [allCourses, setAllCourses] = useState([]);
  const [coursewares, setCoursewares] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseware, setSelectedCourseware] = useState(null);
  const [showNewCourses, setShowNewCourses] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  async function loadData() {
    try {
      setLoading(true);
      const [coursesData, coursewaresData] = await Promise.all([
        getCourses(),
        getCoursewares(),
      ]);
      setAllCourses(coursesData);
      setCoursewares(coursewaresData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getCurrentCourses() {
    return user.myCurrentCourses || [];
  }

  function getAvailableCourses() {
    const currentIds = (user.myCurrentCourses || []).map((c) =>
      String(c.courseId)
    );
    return allCourses.filter((c) => !currentIds.includes(String(c._id)));
  }

  function getCurrentCoursewareForUser(courseId) {
    const currentCW = (user.myCurrentCoursewares || []).find(
      (cw) => String(cw.courseId) === String(courseId)
    );
    if (!currentCW) return null;
    return coursewares.find(
      (cw) => String(cw._id) === String(currentCW.coursewareId)
    );
  }

  if (!user) {
    return (
      <Container py="xl">
        <Title order={2}>Please log in to access your courses.</Title>
      </Container>
    );
  }

  if (loading) {
    return (
      <Center py="xl">
        <Loader size="lg" />
      </Center>
    );
  }

  if (selectedCourseware) {
    return (
      <Container size="lg" py="xl">
        <Button
          variant="subtle"
          mb="md"
          onClick={() => setSelectedCourseware(null)}
        >
          ← Back to Course
        </Button>
        <CoursewarePage courseware={selectedCourseware} />
      </Container>
    );
  }

 if (selectedCourse) {
  const isCurrentCourse = (user.myCurrentCourses || []).some(
    (c) => String(c.courseId) === String(selectedCourse.courseId)
  );
  console.log("1" + coursewares);
  console.log("2" + selectedCourse);

  return (
    <Container size="lg" py="xl">
      <Button
        variant="subtle"
        mb="md"
        onClick={() => setSelectedCourse(null)}
      >
        ← Back to Courses
      </Button>

      {isCurrentCourse ? (
        <CoursePage
          course={selectedCourse}
          coursewares={coursewares.filter(
            (cw) => String(cw.courseId) === String(selectedCourse.courseId)
          )}
          user={user}
          updateUser={reloadUser}
        />
      ) : (
        <NewCoursePage
          course={selectedCourse}
          coursewares={coursewares.filter(
            (cw) => String(cw.courseId) === String(selectedCourse.courseId)
          )}
          onStart={async () => {
            try {
              await startCourse(user._id, selectedCourse._id);
              await reloadUser();
              setShowNewCourses(false);
              setSelectedCourse(null);
            } catch (err) {
              console.error("❌ Failed to start course:", err);
            }
          }}
        />
      )}
    </Container>
  );
}

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="md">
        <Title order={2}>
          {showNewCourses ? "Available Courses" : "My Current Courses"}
        </Title>
        <Button
          variant="light"
          onClick={() => setShowNewCourses((prev) => !prev)}
        >
          {showNewCourses ? "← Back" : "+ New Course"}
        </Button>
      </Group>

      <CourseList
        courses={showNewCourses ? getAvailableCourses() : getCurrentCourses()}
        coursewares={coursewares}
        onSelectCourse={(course) => setSelectedCourse(course)}
      />
    </Container>
  );
}
