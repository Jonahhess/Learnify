import { useEffect } from "react";
import { Container } from "@mantine/core";
import LearnSystem from "../components/LearnSystem";
import { useAuth } from "../context/AuthContext.jsx";

export default function Learn() {
  const { reloadUser } = useAuth();

  useEffect(() => {
    reloadUser();
  }, []);

  return (
    <Container size="lg" py="xl">
      <LearnSystem />
    </Container>
  );
}