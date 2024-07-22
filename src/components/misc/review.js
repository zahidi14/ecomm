import Image from "next/image";

const { default: StarRating } = require("./stars");

export function Review({ reviewerName, reviewerEmail, comment, date, rating }) {
  return (
    <div className="flex items-start mt-8">
      <Image
        width={12}
        height={12}
        src="https://readymadeui.com/team-2.webp"
        alt="test"
        className="w-12 h-12 rounded-full border-2 border-white"
      />
      <div className="ml-3">
        <h4 className="text-sm  text-gray-800 font-bold">{reviewerName}</h4>
        <div className="flex space-x-1 mt-1">
          <p className="text-xs !ml-2 font-semibold">
            <StarRating rating={rating} />
          </p>
        </div>
        <p className="text-xs mt-4  text-gray-800">{comment}</p>
      </div>
    </div>
  );
}
