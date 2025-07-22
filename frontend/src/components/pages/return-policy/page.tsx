import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="bg-white">
      <section className="flex flex-col justify-center items-center gap-20 lg:gap-10 px-[60px] lg:px-5 pt-[220px] md:pt-[250px] pb-20 lg:pb-14">
        <div className="w-full h-[114px] flex items-center justify-center bg-[#FFECEC] text-[#393939]">
          <h1 className="text-[40px] text-[#393939] font-semibold ">
            Azany Global Return Policy
          </h1>
        </div>

        <div className="max-w-[968px] flex flex-col gap-10 text-[17px] font-light">
          <p>
            At Azany, we strive to provide the best possible shopping experience
            for our customers worldwide. To ensure clarity and consistency, we
            have established a global return policy that outlines the procedures
            and guidelines for returns in various regions.
          </p>

          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">United States:</h2>
            <p>
              Return Window: Returns must be initiated within 5 days of
              receiving the product. Condition of Return: Items must be returned
              in their original packaging and in unused condition. Return
              Process: Customers can initiate the return process online through
              their Azany account or by contacting our customer service team.
              Once approved, they can return the item via mail or drop-off at a
              designated return location.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Africa:</h2>
            <p>
              Return Window: Returns must be initiated within 24 hours of
              receiving the product. Condition of Return: Items must be returned
              in their original packaging and in unused condition. Return
              Process: Customers are required to contact our customer service
              team to initiate the return process. Once approved, they can
              return the item to the designated return center.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Caribbean</h2>
            <p>
              Return Window: Returns must be initiated within 24 hours of
              receiving the product. Condition of Return: Items must be returned
              in their original packaging and in unused condition. Return
              Process: Customers can initiate the return process by contacting
              our customer service team. Once approved, they can return the item
              to the designated return center.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">United Kingdom</h2>
            <p>
              Return Window: Returns must be initiated within 30 days of
              receiving the product. Condition of Return: Items must be returned
              in their original packaging and in unused condition. Return
              Process:Customers can initiate the return process online through
              their Azany account. Once approved, they can return the item via
              mail or drop-off at a designated return location.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Asia and India</h2>
            <p>
              Return Window: Returns must be initiated within 3 days of
              receiving the product. Condition of Return: Items must be returned
              in their original packaging and in unused condition. Return
              Process: Customers can initiate the return process online through
              their Azany account or by contacting our customer service team.
              Once approved, they can return the item via mail or drop-off at a
              designated return location.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Additional Notes:</h2>
            <p>
              <ul className="list-disc ml-10">
                <li>
                  Refunds will be issued once the returned item is received and
                  inspected.
                </li>
                <li>
                  Shipping costs for returns may vary depending on the region
                  and the reason for return.
                </li>
                <li>
                  Certain items may be ineligible for return due to hygiene or
                  safety reasons. Please refer to our product-specific return
                  policies for more information.
                </li>
              </ul>
            </p>
            <p>
              At Azany, we are committed to providing a seamless and hassle-free
              return experience for our customers across the globe. If you have
              any questions or need assistance with your return, please
              don&apos;t hesitate to contact our customer service team.
            </p>
            <p>Thank you for choosing Azany for your shopping needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReturnPolicy;
