import { Card, Text, Radio, Stack } from "@mantine/core";

export default function QuestionCard({ question, value, onChange, submitted }) {
  const options = [...question.incorrectAnswers, question.correctAnswer].sort(
    () => Math.random() - 0.5
  );

  function getColor(opt) {
    if (!submitted) return "inherit";
    if (opt === question.correctAnswer) return "green";
    if (opt === value) return "red";
    return "inherit";
  }

  return (
    <Card shadow="sm" withBorder padding="lg">
      <Text fw={500} mb="sm">{question.questionText}</Text>
      <Radio.Group value={value || ""} onChange={onChange}>
        <Stack>
          {options.map((opt, i) => (
            <Radio
              key={i}
              value={opt}
              label={opt}
              styles={{
                label: { color: getColor(opt), fontWeight: submitted ? 600 : 400 },
              }}
            />
          ))}
        </Stack>
      </Radio.Group>
    </Card>
  );
}
