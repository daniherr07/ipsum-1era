import { address } from "@/app/const";

export async function useFetchBackend(url, method, formData = {}){
    try {
        if(method == 'GET'){
            const response = await fetch(`${address}/${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const result = await response.json();
            return result
    
        } else {
     
            const response = await fetch(`${address}/${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            console.log(response)
            const result = await response.json();
    
            return result
        } 
    }

    catch (error) {
        console.log(error)
    }


}