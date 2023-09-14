import { BACKEND_HOST } from "./helpers";

export const syncDatabase = async () => {
    try {
        const response = await fetch(`${BACKEND_HOST}/syncDatabase`);
        const data = await response.json();
        return data;
    } catch (error) {
      console.log(error)
    }
}
