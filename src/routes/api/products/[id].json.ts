import type { Product } from "src/types";
import { BASE_URL, POSTS_API_URL } from '../../../lib/variables'


export async function get(request: any): Promise<{ body: Product }> {

    const id = request.params.id
    const url = `${BASE_URL}${POSTS_API_URL}/${id}`;
    const res = await fetch(url);
    const result = await res.json();



    return { body: result }
} 