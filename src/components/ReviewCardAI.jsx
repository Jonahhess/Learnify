// ReviewCardAI.jsx
import { Card, Text, Button, Group, Badge, Stack } from "@mantine/core";
import { useState } from "react";

export default function ReviewCard({ card, onAnswered }) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(null);

  const answers = [
    ...card.question.incorrectAnswers,
    card.question.correctAnswer,
  ].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    const success = answer === card.question.correctAnswer;
    setCorrect(success);
    setAnswered(true);
    onAnswered?.({ questionId: card.question._id, success });
  };

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={500}>{card.question.questionText}</Text>
          <Badge color="blue">
            {new Date(card.nextReviewDate).toLocaleDateString()}
          </Badge>
        </Group>

        {!answered ? (
          <Group grow>
            {answers.map((ans) => (
              <Button
                key={ans}
                onClick={() => handleAnswer(ans)}
                variant="light"
              >
                {ans}
              </Button>
            ))}
          </Group>
        ) : (
          <Text c={correct ? "green" : "red"}>
            {correct
              ? "✅ Correct!"
              : "❌ Wrong. Correct: " + card.question.correctAnswer}
          </Text>
        )}

        <Group justify="space-between">
          <Text size="sm">Reviews: {card.reviews}</Text>
          <Text size="sm">Successes: {card.successes}</Text>
        </Group>
      </Stack>
    </Card>
  );
}