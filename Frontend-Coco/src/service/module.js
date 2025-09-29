import axios from "axios";
import { config } from "./config";

// Fetch all Modules from backend for CoCo feedback form creation

export async function getModules() {
  const token = localStorage.getItem("token");
  try {
    const url = `${config.cocoServerBaseURL}/module/modules`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching modules:", err);
    return { status: "error", error: err.message };
  }
}

//  Fetch all Module-Type from backend for CoCo feedback form creation

export async function getModuleType() {
  const token = localStorage.getItem("token");
  try {
    const url = `${config.cocoServerBaseURL}/module_type/module_types`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching module types:", err);
    return { status: "error", error: err.message };
  }
}
