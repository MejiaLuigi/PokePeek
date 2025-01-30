export default async function getApi(limit = 10, offset = 0) {
    const endPoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try{
        const infoData = await fetch(endPoint);

        if (!infoData.ok) {  // 📌 Validamos si el fetch falló
            return { error: true };
        }

        const dataResponse = await infoData.json();      
        return dataResponse
      
    } catch (error) {
        console.log("This is an error", error);
        throw error;        
    }
}