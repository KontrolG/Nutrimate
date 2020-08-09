export const getDisplayName = element => {
  if (typeof element === "string") {
    return element;
  }
  return element.displayName || element.name || "Component";
};

export { default as fetchData } from "./fetchData";