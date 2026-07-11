import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

export default function useProducts() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadProducts() {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    }

    useEffect(() => {

        loadProducts();

    }, []);

    return {

        products,
        loading,
        reload: loadProducts,

    };

}