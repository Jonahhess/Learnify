import { Container, Title, Text, Group, Button, Paper, Stack, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <Container size="sm" py="xl">
      <Flex
        align="center"
        justify="center"
        style={{ minHeight: '80vh' }} // vertically center
      >
        <Paper
          radius="lg"
          p="xl"
          withBorder
          shadow="md"
          style={{ textAlign: 'center' }}
        >
          <Stack gap="md" align="center">
            {/* Brand */}
            <Title order={1} size="2.5rem">
              Learnify
            </Title>
            <Text c="dimmed" size="lg" maw={500}>
              A one-stop shop to learn, understand, and retain anything.  
              Generate courses, read, quiz, and review.
            </Text>

            {/* Actions */}
            <Group mt="md">
              <Button
                size="md"
                component={Link}
                to="/learn"
                radius="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                Start learning
              </Button>
              <Button
                size="md"
                component={Link}
                to="/review"
                radius="md"
                variant="outline"
              >
                Review
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Flex>
    </Container>
  );
}
