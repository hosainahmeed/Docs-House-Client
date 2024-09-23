import { useState } from "react";

function SmallButton({ value }) {
  let [activeBtn, setActiveBtn] = useState(true);

  const handleMouseOver = () => {
    setActiveBtn(false);
  };

  const handleMouseOut = () => {
    setActiveBtn(true);
  };
  return (
    <div>
      <button
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className={
          activeBtn
            ? "rounded-xl px-16 border-2 border-[#F7A582] py-4 transition-all bg-[#F7A582]"
            : "rounded-xl px-16 border-2 border-[#F7A582] py-4 transition-all hover:bg-['']"
        }
      >
        {value}
      </button>
    </div>
  );
}

export default SmallButton;
