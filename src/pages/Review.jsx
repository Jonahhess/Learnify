// Review.jsx
import { useEffect, useState } from "react";
import { Container, Title, Stack, Loader, Text, Button } from "@mantine/core";
import ReviewCard from "../components/ReviewCard";
import { batchSubmitReviewCards } from "../api/users";
import { useAuth } from "../context/AuthContext";

export default function Review() {
  const [cards, setCards] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, reloadUser } = useAuth();

  useEffect(() => {
    if (user?.myReviewCards) {
      setCards(user.myReviewCards);
      setLoading(false);
    }
  }, [user]);

  const handleAnswered = (result) => {
    setResults((prev) => [...prev, result]);
    // optionally remove card from view immediately:
    setCards((prev) => prev.filter((c) => c._id !== result._id));
  };

  const handleSubmit = async () => {
    try {
      await batchSubmitReviewCards(user._id, results);
      await reloadUser();
      setResults([]);
    } catch (err) {
      console.error("Batch submit failed:", err);
    }
  };

  if (!user) {
    return (
      <Container py="xl">
        <Title order={2}>Please log in to access your review cards.</Title>
      </Container>
    );
  }

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
        {results.length > 0 && (
          <Button mt="md" onClick={handleSubmit}>
            Submit Results
          </Button>
        )}
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        Review
      </Title>
      <Stack>
        {cards.map((card) => (
          <ReviewCard key={card._id} card={card} onAnswered={handleAnswered} />
        ))}
      </Stack>
      {results.length > 0 && (
        <Button mt="lg" onClick={handleSubmit}>
          Submit {results.length} Results
        </Button>
      )}
    </Container>
  );
}
