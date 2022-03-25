export const AlertTemplate = ({ options, message, close }: any) => (
  <div
    style={{
      margin: 20,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "20rem",
      height: "4rem",
      backgroundColor: options.type === "error" ? "#F6029C" : "#2ECD94",
      color: "#0A0A1E",
      padding: "1rem",
    }}
  >
    {message}
  </div>
);
