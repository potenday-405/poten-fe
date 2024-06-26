import { useNavigate } from "react-router-dom";
import BackArrow from "./icons/LeftChevron";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBackClick} className="absolute">
      <BackArrow />
    </button>
  );
}
