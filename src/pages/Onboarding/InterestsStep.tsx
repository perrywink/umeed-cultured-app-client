import { useState } from "react";
import { Button, Spinner } from "../../components";

type Props = {
    handleSubmit: () => void,
    loading: boolean
}

const InterestsStep = ({handleSubmit, loading}: Props) => {
  return (
    <div>
      Interests
      <Button onClick={handleSubmit} styles="mt-5 text-lg">
        {loading ? <Spinner /> : "Get Started"}
      </Button>
    </div>
  );
};

export default InterestsStep;
