import { Stack, Button } from "@mantine/core";

export default function CoursewareList({ coursewares, currentIndex, onSelect }) {
  return (
    <Stack>
      {coursewares.map((cw, idx) => {
        const isCurrent = idx === currentIndex;
        const isCompleted = idx < currentIndex;
        const isFuture = idx > currentIndex;

        let color = "gray";
        let disabled = true;

        if (isCompleted) {
          color = "green"; 
        } else if (isCurrent) {
          color = "blue"; 
          disabled = false; 
        } else if (isFuture) {
          color = "gray"; 
        }

        return (
          <Button
            key={cw._id || idx}
            fullWidth
            color={color}
            variant="light"
            disabled={disabled}
            onClick={() => isCurrent && onSelect(cw)}
          >
            {cw.title}
          </Button>
        );
      })}
    </Stack>
  );
}
