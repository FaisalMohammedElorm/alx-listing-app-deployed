import { CardProps } from "../../interfaces";

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white max-w-sm">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
