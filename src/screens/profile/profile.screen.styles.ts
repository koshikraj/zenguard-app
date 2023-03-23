import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  profileContainer: {
    marginTop: "45px",
  },
  formContainer: {
    padding: "64px 156px",
    background: "rgba(24, 38, 53, 1)",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: "30px 20px",
    },
  },
  button: {
    background: "rgba(102, 99, 253, 0.5)",
  },
}));
