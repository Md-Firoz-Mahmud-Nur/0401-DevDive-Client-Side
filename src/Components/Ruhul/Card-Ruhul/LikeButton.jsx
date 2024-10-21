import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import './LikeButton.css'; 

const LikeButton = ({ handleLike, isLiked, data, isLoading }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    if (!isLoading) {

      setAnimate(true);
 
      handleLike(data._id);

  
      setTimeout(() => {
        setAnimate(false);
      }, 600); 
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1 transition duration-500 transform ${
        isLiked ? "text-blue-500" : "text-gray-600"
      } ${animate ? 'animate-bounce' : ''}`}
      disabled={isLoading}
    >
      <FaThumbsUp
        className={`h-6 w-6 transition-transform duration-500 ${
          animate ? 'rotate-12 scale-125' : 'scale-100'
        }`} 
      />
      <span className="text-sm">{data?.likes || 0}</span>
    </button>
  );
};

export default LikeButton;
