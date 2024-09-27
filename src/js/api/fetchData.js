import { alertUser } from "../errorHandling/alertUser";

export async function fetchData(url, object = {}, alertType) {
  if (typeof url !== "string" || !url.trim()) {
    console.error("Invalid URL provided");
    throw new Error("Invalid URL");
  }

  try {
    const response = await fetch(url, object);

    const result = await response.json();

    alertUser(alertType, response.status);

    if (!response.ok) {
      console.error("Error:", response.status, response.statusText);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return result;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
