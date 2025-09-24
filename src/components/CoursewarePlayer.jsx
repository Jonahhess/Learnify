import { useState } from "react";
import { Container, Title, Text, Button, Group } from "@mantine/core";
import QuestionCard from "./QuestionCard.jsx";

export default function CoursewarePlayer({
  courseware,
  questions,
  onComplete,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  function handleAnswer(qid, value) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function next() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function submit() {
    let sc = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) sc++;
    });
    const percent = (sc / questions.length) * 100;
    setScore(percent);
    setSubmitted(true);
    onComplete(percent >= 80);
  }

  return (
    <Container>
      <Title order={3} mb="sm">{courseware.title}</Title>
      {!submitted && (
        <Text mb="lg">{courseware.text}</Text>
      )}

      <QuestionCard
        question={questions[currentIndex]}
        value={answers[questions[currentIndex]._id]}
        onChange={(val) => handleAnswer(questions[currentIndex]._id, val)}
        submitted={submitted}
      />

      <Group mt="md">
        <Button onClick={prev} disabled={currentIndex === 0}>
          ← Prev
        </Button>
        {currentIndex < questions.length - 1 ? (
          <Button onClick={next}>Next →</Button>
        ) : !submitted ? (
          <Button color="blue" onClick={submit}>
            Submit Quiz
          </Button>
        ) : null}
      </Group>

      {submitted && (
        <Text mt="lg" fw={600}>
          Your score: {score.toFixed(0)}%
        </Text>
      )}
    </Container>
  );
}
