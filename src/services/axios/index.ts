import axios from "axios"

export const POST = async (url: string, data: any) => {
  console.log("Complete axios path is: ", process.env.API_URL + url);
  const response = await axios.post(`http://localhost:3000/api${url}`, data)
  return response.data
}