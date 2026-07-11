export const taskListStyles = {
  heading: {
    color: "#01381e",
  },
  card: (completed: boolean) => ({
    backgroundColor: completed ? "#dee2b1" : "#ffffff",
    border: "1px solid #dee2b1",
    borderRadius: 3,
    p: 2.5,
    transition: "all 0.2s ease",
  }),
  checkbox: {
    mt: 0.25,
    color: "#01381e",
    "&.Mui-checked": { color: "#01381e" },
  },
  title: (completed: boolean) => ({
    color: "#01381e",
    fontWeight: 700,
    fontSize: "1.1rem",
    textDecoration: completed ? "line-through" : "none",
    opacity: completed ? 0.6 : 1,
  }),
  description: {
    color: "#01381e",
    fontSize: "0.95rem",
    opacity: 0.7,
  },
};