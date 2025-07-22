const baseButtonStyle = {
  display: "inline-flex",
  flexShrink: 0,
  cursor: "pointer",
  userSelect: "none",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  color: "#FDFBFB",
  borderRadius: "4px",
  borderWidth: "0px",
  "&:hover": {
    backgroundColor: "transparent",
    borderWidth: "1px",
  },
};

const MainButtonStyle = {
  padding: "4px 12px",
};

const generateButtonStyles = (
  color: string,
  size: object,
  outline: boolean = false,
   
) => ({
  ...baseButtonStyle,
  borderColor: color,
  borderWidth: outline ? "1px" : "0px",
  backgroundColor:  outline ? "#fff" : color,
  color: outline ? color : "#fff",
  ...size,
  "&:hover": {
    ...baseButtonStyle["&:hover"],
    color: outline ? "#fff" : color,
    borderColor: color,
    backgroundColor: outline ? color : "#fff",
  },
});

const btn = {
  ".main-btn-primary": generateButtonStyles("#DB4444", MainButtonStyle),
  ".main-btn-primary_outline": generateButtonStyles(
    "#DB4444",
    MainButtonStyle,
    true
  ),
//   ".main-btn-white": generateButtonStyles(
//     "#DB4444",
//     MainButtonStyle,
//     true,
//     "#fff"
//   ),
};

export default btn;
