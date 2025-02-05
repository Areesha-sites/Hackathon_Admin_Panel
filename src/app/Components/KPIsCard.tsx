import { MdOutlineArrowUpward } from "react-icons/md";

interface KPIsCard {
  title: string;
  value: string;
  icon: JSX.Element;
}
export default function KPIsCard({ title, value, icon }: KPIsCard) {
  return (
   <div className="flex justify-center items-center flex-wrap">
     <div className="bg-gray-700 px-6 py-3 rounded-lg shadow-2xl flex flex-col justify-start h-44 w-52 xxl:w-60">
      <div className="bg-gray-800 rounded-full p-3 h-[40px] w-[40px] flex justify-center items-center">
        <div>{icon}</div>
      </div>
      <div className="mt-3">
        <p className="text-[20px] font-satoshiBold font-bold text-white">
          {value}
        </p>
        <div className="flex justify-between w-full mt-2">
          <p className="text-[14px] font-satoshi font-normal text-white/55">
            {title}
          </p>
          <div className="flex justify-end gap-x-[5px]">
            <p className="text-[12px] font-satoshi text-green-500">0.43%</p>
            <MdOutlineArrowUpward className="text-[15px] text-green-500" />
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
