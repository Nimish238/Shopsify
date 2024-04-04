import axios from "axios"

export const userData= async ()=>{
  try{
    const endpoint = `/json/Database.json`;
    const user = await axios.get(endpoint);
    return user;
  }catch(error){
    console.error("Error fetching ")
  }
}

export const FetchData = async () => {
  try{
    const response =await axios.get("https://fakestoreapi.com/products")
    return response.data;
    
  }catch(error){
    console.error('Error fetchinf data:',error);
     return [];
  }
};



