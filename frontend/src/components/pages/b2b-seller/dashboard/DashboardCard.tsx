const DashboardCard = (stat: any) => {
  return (
    <div
      style={{ backgroundColor: stat.color }}
      className="text-white overflow-hidden p-6 rounded-md relative flex flex-col justify-between"
    >
      <div className="absolute bottom-0 left-0 -translate-x-1/2 bg-white opacity-5 size-[250px] rounded-full"></div>
      <div>
        <p className="text-[28px] font-bold">{stat.value}</p>
        <p className="text-[18px] font-[400]">{stat.label}</p>
      </div>
      <div className="flex justify-end mt-1">
        <stat.Icon className="size-[30px]" />
      </div>
    </div>
  );
};

export default DashboardCard;
