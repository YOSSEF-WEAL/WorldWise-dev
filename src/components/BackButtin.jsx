import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButtin() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClik={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButtin;
