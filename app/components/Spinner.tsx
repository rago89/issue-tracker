import React from "react";

interface SpinnerProps {
  height: number;
  width: number;
}

const Spinner: React.FC<SpinnerProps> = ({ height, width }) => {
  return (
    <div
      className={`inline-block h-${height} w-${width} animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
