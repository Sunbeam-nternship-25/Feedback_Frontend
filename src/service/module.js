import axios from "axios";
import { config } from "./config";

// for Student module
export async function getModules() {
  const url = `${config.cocoServerBaseURL}/module/modules`;
  const token = localStorage.getItem("token");
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, // <-- add Bearer
    },
  });
;
  return response.data;
}

// for Student module
export async function getModuleType() {
  const url = `${config.cocoServerBaseURL}/module_type/module_types`;
  const token = localStorage.getItem("token");
  
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, // <-- add Bearer
    },
  });
;
  return response.data;
}

