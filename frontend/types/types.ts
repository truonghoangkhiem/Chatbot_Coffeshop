export interface Product { 
    category: string;
    description: string;
    image_path: string;
    name: string;
    price: number;
    rating: number;
}

export interface ProductCategory{ 
    id:string,
    selected: boolean,
}
