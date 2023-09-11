export const getAllMenuItems = async () => {
    try {
        const response = await fetch('http://localhost:3001/getAllMenuItems');
        const data = await response.json()
        return data
      } catch (error) {
        console.log(error);
      }
} 