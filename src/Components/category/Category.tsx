import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./category.css"
import Loader from '../Common/Loader';
import { getProducts, getCategories } from '../../services/api.service';
import { useLocation } from "react-router-dom";



interface CardProps {
  _id: number;
  name: string;
  availability: number;
  price: number;
}
// const data: Array<CardProps> = [
//   {
//     id: 1,
//     name: "Fresh Pear - Indian",
//     availability: 4,
//     price: 40,
//   },
//   {
//     id: 2,
//     name: "Fresh Apple - Indian",
//     availability: 40,
//     price: 140,
//   },
//   {
//     id: 3,
//     name: "Fresh Mango - Indian",
//     availability: 10,
//     price: 40,
//   },
//   {
//     id: 4,
//     name: "Fresh Orange - Indian",
//     availability: 6,
//     price: 90,
//   },
// ];



const Category = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    getCategoriesData()
    if (searchQuery) {
      getSearchResults()
    } else {
      getHomeProducts()
    }
    console.log('searchQuery :>> ', searchQuery);
  }, [searchQuery])

  const getSearchResults = async () => {
    const searchFilter = {
      productName: { $regex: searchQuery, $options: "i" },
    };
    const res = await getProducts(searchFilter)
    setProducts(res.data)
    console.log('res :>> ', res);
  }


  const getHomeProducts = async () => {

    const fruitsFilter = {
      categories: { $regex: "Fruits", $options: "i" }
    };
    setLoading(true)
    const response = await Promise.all([
      getProducts(fruitsFilter)
    ])
    setLoading(false)

    setProducts(response[0].data.slice(0, 8))

  }
  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data)
      console.log('Category data:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="categortWrap min-h-screen w-full h-full">
      {!loading ? (
        <div className="grid grid-cols-4 gap-1">
          <div className="col-start-1 col-end-2 p-6 pl-12">
            <div className="box border-2 border-b-0 border-[#ddd]">
              {categories.map((category: any) => (
                <div key={category._id} className="activeCategory border-[#ddd] border-b-2  p-5 flex align-middle hover:bg-[#F2FFF3] active  hover:border-r-0 hover:cursor-pointer ">
                  <img
                    // src="/assets/images/karela.svg"

                    src={category.imgUrl}
                    className="w-12 pr-4 mix-blend-multiply"
                    alt="img"
                  />
                  <p>{category.catergories}</p>
                </div>
              ))}
              {/* <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/pear.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Fruits</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/custudapple.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Salads</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/cherry.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Berries</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-t-0  p-5 flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/karela.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Vegetables</p>
            </div>
            <div className="border-[#ddd] border-b-2  p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/pear.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Fruits</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/custudapple.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Salads</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/custudapple.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Berries</p>
            </div> */}
            </div>
          </div>
          <div className="col-start-2 col-end-5 p-6 pr-12">
            <p className="mb-5 font-semibold text-2xl">Fruits</p>
            {products.length > 0 ? (
              <div className="grid grid-cols-4 grid-rows-auto gap-4">
                {
                  products.map((cardData: CardProps) => {
                    return <Card key={cardData._id} cardData={cardData} />;
                  })
                }
              </div>
            ) : (
              <p className="text-center text-xl">No Products Available</p>
            )}
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
};

export default Category;
