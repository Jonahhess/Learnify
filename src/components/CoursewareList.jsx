import { SimpleGrid } from "@mantine/core";
import CoursewareCard from "./CoursewareCard.jsx";

export default function CoursewareList({ coursewares }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      {coursewares.map((cw) => (
        <CoursewareCard key={cw._id} courseware={cw} />
      ))}
    </SimpleGrid>
  );
}
