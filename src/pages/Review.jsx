import { Container, Title, Text } from '@mantine/core';

export default function Review() {
  return (
    <Container size="lg" py="xl">
      <Title order={2}>Review</Title>
      <Text c="dimmed">Coming soon – spaced repetition & recap of previous lessons.</Text>
    </Container>
  );
}