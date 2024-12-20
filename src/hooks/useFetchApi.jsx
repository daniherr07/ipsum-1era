import { address } from "@/app/const";

export async function useFetchBackend(url, method, formData = {}){

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
    
        const result = await response.json();
        return result
    }


}