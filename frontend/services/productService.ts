import { supabase } from "@/config/supabaseConfig"; 
import { Product } from "@/types/types";

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');

  console.log("direct supabase: ", data);
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
};

export { fetchProducts };

