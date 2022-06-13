import type { Product } from "src/types";
import { BASE_URL, POSTS_API_URL } from '../../lib/variables'


export async function get(): Promise<{ body: Product }> {
    const url = `${BASE_URL}${POSTS_API_URL}`;

    const res = await fetch(url);
    const result = await res.json();



    return { body: result }
} 