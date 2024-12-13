//create 7.09

export interface Product { 
    id: string;
    category: string;
    description: string;
    image_url: string;
    name: string;
    price: number;
    rating: number;
}

// created 8.26
export interface ProductCategory{ 
    id:string,
    selected: boolean,
}