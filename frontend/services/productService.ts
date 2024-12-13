//Purpose: connect to database

import { supabase } from "@/config/superbaseConfig";
import { Product } from "@/types/types";

const fetchProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("products") 
        .select("*");

    return data as Product[];
};

export { fetchProducts };
// Completed 7.13