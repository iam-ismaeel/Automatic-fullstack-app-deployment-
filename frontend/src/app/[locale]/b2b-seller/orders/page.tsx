import OrdersAndRFQs from "@/components/pages/b2b-seller/orders/OrdersAndRFQs.";
import Overview from "@/components/pages/b2b-seller/orders/Overview";

const OrdersPage = () => {
  return (
    <div>
      <p className="text-[#23272E] font-bold text-[24px] mb-4">
        Orders and RFQs
      </p>
      <div className="grid gap-4 lg:grid-cols-1 grid-cols-2 items-end">
        <Overview />
      </div>
      <OrdersAndRFQs />
    </div>
  );
};

export default OrdersPage;
