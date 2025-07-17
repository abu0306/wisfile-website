import DelIcon from "@/assets/svg/delete.svg";
import { useFiles } from "@/contexts/FileContext";

interface DelProps {
  record: any;
}

const Del = (props: DelProps) => {
  const { removeFile } = useFiles();
  return (
    <div
      className="flex justify-center items-center cursor-pointer p-2 md:p-1"
      onClick={() => {
        removeFile(props.record.name);
      }}
    >
      <DelIcon className="text-[#AAAAAC] w-4 h-4 md:w-auto md:h-auto" />
    </div>
  );
};

export default Del;
