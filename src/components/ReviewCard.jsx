import { Card, Text, Button, Group, Badge, Stack } from "@mantine/core";
import { useState } from "react";
import { updateReviewCard } from "../api/reviewCard";

export default function ReviewCard({ card, onAnswered }) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(null);

  const answers = [...card.question.incorrectAnswers, card.question.correctAnswer]
    .sort(() => Math.random() - 0.5);

  const handleAnswer = async (answer) => {
    const success = answer === card.question.correctAnswer;
    try {
      await updateReviewCard(card._id, { success });
      setCorrect(success);
      setAnswered(true);
      onAnswered?.(card._id, success);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={500}>{card.question.questionText}</Text>
          <Badge color="blue">{new Date(card.nextReviewDate).toLocaleDateString()}</Badge>
        </Group>

        {!answered ? (
          <Group grow>
            {answers.map((ans) => (
              <Button key={ans} onClick={() => handleAnswer(ans)} variant="light">
                {ans}
              </Button>
            ))}
          </Group>
        ) : (
          <Text c={correct ? "green" : "red"}>
            {correct ? "✅ Correct!" : "❌ Wrong. Correct: " + card.question.correctAnswer}
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
