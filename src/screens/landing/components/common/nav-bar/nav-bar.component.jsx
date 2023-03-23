import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
//@ts-ignore
import Logo from "../../../assets/logo/logo.svg";
import { StyledNav } from "./nav-bar.component.styles";

import { ActionIcon, useMantineColorScheme, createStyles,
  Group} from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconBrandDiscord,
  IconBrandGithub,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({

  buttonContainer: {
    width: "30px",
    height: "30px",
    padding: "2px",
    border:"1px solid 1px solid #25262B ",
    borderRadius: "4px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

}));


export function NavBar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { classes } = useStyles();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <StyledNav>
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src={Logo}
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={active ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <Group className={classes.container}>
            <ActionIcon
              className={classes.buttonContainer}
              // variant="filled"
              component="a"
              href="https://discord.safient.io/"
              title="Discord"
              target="_blank"
            >
              {/* <Image src={Discord} height={18} width={18} /> */}
              <>
                <IconBrandDiscord size={18} color="white" />
              </>
            </ActionIcon>
            <ActionIcon
              className={classes.buttonContainer}
              // variant="filled"
              component="a"
              href="https://github.com/koshikraj/zenguard-app"
              title="github"
              target="_blank"
            >
              <>
                <IconBrandGithub size={18} color="white"/>
              </>
              {/* <Image src={GitHub} height={18} width={18} /> */}
            </ActionIcon>

          </Group>
      </nav>
    </StyledNav>
  );
}
