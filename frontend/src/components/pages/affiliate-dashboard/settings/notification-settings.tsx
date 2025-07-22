import SpaceBetween from "@/components/common/SpaceBetween";
import { Switch } from "rizzui";

const NotificationSettings = () => {
  return (
    <div className="text-[#212121] mt-6">
      <p className="text-[18px] text-[#333333] mb-8">
        You can choose how you want to be paid on this platform
      </p>

      <SpaceBetween className="py-4 border-b">
        <p>Email Notification</p>
        <Switch switchKnobClassName="bg-white" switchClassName="bg-gray-400" />
      </SpaceBetween>
      <SpaceBetween className="py-4 border-b">
        <p>System Notification</p>
        <Switch switchKnobClassName="bg-white" switchClassName="bg-gray-400" />
      </SpaceBetween>
    </div>
  );
};

export default NotificationSettings;
