import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Center,
  Stack,
  Tooltip,
  UnstyledButton,
  Avatar,
  Drawer,
  Text,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import {
  IconHome2,
  IconBook,
  IconChartBar,
  IconLogout,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

import classes from "./Sidebar.module.css"; 

function NavIcon({ icon: Icon, label, onClick, active, color, children }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        style={{ color }}
      >
        {Icon ? <Icon size={22} stroke={1.6} /> : children}
      </UnstyledButton>
    </Tooltip>
  );
}

export default function Sidebar() {
  const { user, onLoggedOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const isAuthed = !!user;

  function handleLogout() {
    onLoggedOut();
    navigate("/login");
  }

  const mainLinks = useMemo(
    () =>
      isAuthed
        ? [
            { icon: IconBook, label: "Learn", to: "/learn" },
            { icon: IconChartBar, label: "Review", to: "/review" },
          ]
        : [],
    [isAuthed]
  );

  return (
    <>
      <nav className={classes.navbar}>
        {/* Top: Home */}
        <Center>
          <NavIcon
            icon={IconHome2}
            label="Home"
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
          />
        </Center>

        {/* Main links */}
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {mainLinks.map(({ icon, label, to }) => (
              <NavIcon
                key={label}
                icon={icon}
                label={label}
                active={location.pathname === to}
                onClick={() => navigate(to)}
              />
            ))}
          </Stack>
        </div>

        {/* Bottom actions */}
        <Stack justify="center" gap={0}>
          {isAuthed ? (
            <>
              {/* Profile button with avatar */}
              <NavIcon
                label={user?.name || "Profile"}
                onClick={() => setProfileOpen(true)} // 👈 open drawer
              >
                <Avatar radius="xl" size={28}>
                  {user?.name ? user.name[0] : "?"}
                </Avatar>
              </NavIcon>

              {/* Logout */}
              <NavIcon
                icon={IconLogout}
                label="Log out"
                onClick={handleLogout}
                color="red"
              />
            </>
          ) : (
            <>
              <NavIcon
                icon={IconLogin}
                label="Log in"
                onClick={() => navigate("/login")}
              />
              <NavIcon
                icon={IconUserPlus}
                label="Register"
                onClick={() => navigate("/signup")}
              />
            </>
          )}
        </Stack>
      </nav>

      {/* Drawer that slides in from the right */}
      <Drawer
        opened={profileOpen}
        onClose={() => setProfileOpen(false)}
        position="right"
        size="md"
        padding="xl"
        title="Profile"
      >
        {user ? (
          <Stack>
            <Group>
              <Avatar size="lg" radius="xl">
                {user?.name ? user.name[0] : "?"}
              </Avatar>
              <div>
                <Text fw={600}>{user.name}</Text>
                <Text size="sm" c="dimmed">
                  {user.email}
                </Text>
              </div>
            </Group>

            <Divider my="sm" />

            <Text size="sm">Enrolled courses: {user.myCurrentCourses?.length || 0}</Text>
            <Text size="sm">Completed courses: {user.myCompletedCourses?.length || 0}</Text>

            <Button
              mt="lg"
              variant="light"
              color="red"
              onClick={() => {
                setProfileOpen(false);
                handleLogout();
              }}
            >
              Log out
            </Button>
          </Stack>
        ) : (
          <Text>No user info</Text>
        )}
      </Drawer>
    </>
  );
}
