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

export interface ProductCategory{ //8.26
    id:string,
    selected: boolean,
}