import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  createScreenContainer: {
    padding: 0,
    marginTop: "66px",
    maxWidth: "1131px",
    [`@media (max-width: 900px)`]: {
      maxWidth: "100%",
      marginTop: "30px",
    },
  },
}));
