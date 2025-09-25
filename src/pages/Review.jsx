import { useEffect, useState } from "react";
import { Container, Title, Stack, Loader, Text } from "@mantine/core";
import { getReviewCards } from "../api/reviewCard";
import ReviewCard from "../components/ReviewCard";

export default function Review() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewCards()
      .then((data) => setCards(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  console.log(cards)
  const handleAnswered = (id, success) => {
    setCards((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, reviews: c.reviews + 1, successes: c.successes + (success ? 1 : 0) }
          : c
      )
    );
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Loader />
      </Container>
    );
  }

  if (!cards.length) {
    return (
      <Container size="lg" py="xl">
        <Title order={2}>Review</Title>
        <Text c="dimmed">No review cards due today 🎉</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">Review</Title>
      <Stack>
        {cards.map((card) => (
          <ReviewCard key={card._id} card={card} onAnswered={handleAnswered} />
        ))}
      </Stack>
    </Container>
  );
}
