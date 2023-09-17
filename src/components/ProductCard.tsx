import IconRatingStar from "../assets/ratingstar.svg";

interface ProductCardProps {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productRating: number;
  discountPercentage: number;
}
export const ProductCard = ({
  productName,
  productDescription,
  productPrice,
  productImage,
  productRating,
  discountPercentage,
}: ProductCardProps) => {
  return (
    <div className="relative mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img
        className="h-48 w-full object-cover object-center"
        src={productImage}
        alt="Product Image"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium text-gray-900">
          {productName}
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <h3>{productRating} </h3>
          <img className="w-5 h-5" src={IconRatingStar} alt="" />
        </div>

        <p className="text-base text-gray-700 mb-4">{productDescription}</p>
      </div>
      <div className="flex justify-between items-center w-full px-4 absolute bottom-0">
        <p className="text-lg font-semibold text-gray-900">${productPrice}</p>
        <p className="text-base font-medium text-green-500">
          {discountPercentage}% off
        </p>
      </div>
    </div>
  );
};
