export const filterSelectStyle = {
  PaperProps: {
    sx: {
      width: "195px",
      bgcolor: "#222234",
      overflow: "initial",
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      "& .MuiList-root": {
        padding: 0,
      },
      "& .MuiMenuItem-root": {
        "&.Mui-selected": {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      "& .Mui-selected": {
        backgroundColor: "transparent",
      },
      "&:before": {
        content: `" "`,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        transform: "translate(0, -85%)",
        position: "absolute",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "18px solid #222234",
        zIndex: 2,
      },
      "&:after": {
        content: `" "`,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        transform: "translate(0, -100%)",
        position: "absolute",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "18px solid #fff",
        zIndex: 1,
      },
    },
  },
  transformOrigin: {
    vertical: -20,
    horizontal: 130,
  },
  // disablePortal: true,
};

export const networkSelectStyle = {
  disablePortal: true,
  PaperProps: {
    sx: {
      bgcolor: "#222234",
      overflow: "initial",
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",

      "& .MuiList-root": {
        padding: 0,
      },
      "& .MuiMenuItem-root": {
        "& .Mui-selected": {
          backgroundColor: "transparent",
        },
        "&:not(:last-of-type)": {
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.5)",
          marginBottom: "0.3rem",
        },
      },
      "& .Mui-selected": {
        backgroundColor: "transparent",
      },
      "&:before": {
        content: `" "`,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        transform: "translate(0, -90%)",
        position: "absolute",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "18px solid #222234",
        zIndex: 2,
      },
      "&:after": {
        content: `" "`,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        transform: "translate(0, -100%)",
        position: "absolute",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "18px solid #fff",
        zIndex: 1,
      },
    },
  },
  //   anchorOrigin: {
  //     vertical: "bottom",
  //     horizontal: "right",
  //   },
  transformOrigin: {
    vertical: -7,
    horizontal: 130,
  },
};
