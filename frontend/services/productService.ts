import { supabase } from "@/config/supabaseConfig"; 
import { Product } from "@/types/types";

console.log('supabase', supabase)
const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
};

export { fetchProducts };

