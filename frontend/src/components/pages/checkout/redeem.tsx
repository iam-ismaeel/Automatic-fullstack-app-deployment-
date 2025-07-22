import Slider from "@/components/common/slider";
import React, { Fragment, useState } from "react";

function Redeem() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Fragment>
      <div className="mt-4">
        <Slider
          min={0}
          max={100}
          step={1}
          value={sliderValue}
          onChange={setSliderValue}
        />

        <div className="flex mt-5">
          <div className="flex-1">
            <label className="font-inter text-[16px]">Points Available</label>
            <h4 className="text-[20px] font-semibold h-[40px]">3400</h4>
          </div>

          <div className="flex-1">
            <label className="font-inter">Enter points</label>
            <input
              type="number"
              className="w-full bg-white h-[40px] rounded border border-[#DEE2E7]"
              placeholder="0"
            />
          </div>
        </div>

        <div className="">
          <button className="w-full text-[#FF5C00] bg-white h-[40px] rounded mt-4 border border-[#DEE2E7]">
            Apply
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Redeem;
