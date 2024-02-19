export interface Product {
    sold: number
    images: string[]
    subcategory: SubcategoryDetails[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
}

 interface SubcategoryDetails {
    _id: string
    name: string
    slug: string
    category: string
}

 interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

 interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}  