import { useMemo } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Center,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconHome2,
  IconBook,
  IconChartBar,
  IconUser,
  IconLogout,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

import classes from "./Sidebar.module.css"; // CSS Module for styling

function NavIcon({ icon: Icon, label, onClick, active, color }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        style={{ color }}
      >
        <Icon size={22} stroke={1.6} />
      </UnstyledButton>
    </Tooltip>
  );
}

export default function Sidebar() {
  const { user, onLoggedOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className={classes.navbar}>
      <Center>
        <NavIcon
          icon={IconHome2}
          label="Home"
          active={location.pathname === "/"}
          onClick={() => navigate("/")}
        />
      </Center>

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

      <Stack justify="center" gap={0}>
        {isAuthed ? (
          <>
            <NavIcon
              icon={IconUser}
              label="Profile"
              onClick={() => navigate("/profile")}
            />
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
  );
}
