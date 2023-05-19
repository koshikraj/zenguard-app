import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, getRef) => ({
  voucherImage: {
    backgroundImage: `url("/images/voucher.svg")`,
    position: "relative",
    width: "100%",
    height: "276px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "8px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: "150px",
    },
  },
  voucherDetailsContainer: {
    borderRadius: "8px",
    width: "591px",
    margin: "45px auto 0 auto",
    minWidth: "591px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
      minWidth: "100%",
    },
  },

  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "10px",
    color: "#fff",
    background: "#6663FD",
    borderRadius: "4px",
    fontWeight: 400,
    fontSize: "12px",
    padding: "12px",
  },
  h3: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "18px",
    color: "#fff",
    margin: 0,
  },
  formContainer: {
    marginBottom: "40px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: "30px 20px",
    },
  },
  button: {
    width: "100%",
    color: "#fff !important",
    background:
      "linear-gradient(89.58deg, #44BCF0 -19.85%, #818CF8 54.07%, #A099FF 120.75%)",
  },
  ghostButton: {
    width: "100%",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  voucherText: {
    fontWeight: "bold",
    color: theme.colorScheme === "dark" ? "#A6A7AB " : "#495057 ",
  },
  voucherTextBlue: {
    color: "transparent",
    textShadow: "0 0 5px rgba(255,255,255,0.9)",
  },
}));
