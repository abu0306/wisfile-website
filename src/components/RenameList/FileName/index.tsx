import TruncatedText from "@/components/TruncatedText";
import ArrowIcon from "@/assets/svg/arrow-right.svg";
import { FileItem } from "@/models/file";
import { Skeleton } from "antd";
import classNames from "classnames";
interface FileNameProps {
  record: FileItem;
}

const FileName = (props: FileNameProps) => {
  const { record } = props;
  const { name, status, newName } = record;
  if (status.includes("pending")) {
    return (
      <div className="flex flex-col gap-y-1">
        <div className="text-[#999] text-[10px] md:text-[12px]">
          <TruncatedText title={name} className="text-[10px] md:text-[12px]">
            {name}
          </TruncatedText>
        </div>
        <div className="flex items-center gap-x-1 md:gap-x-2">
          <ArrowIcon className="w-3 md:w-auto h-3 md:h-auto" />
          <Skeleton active title={false} paragraph={{ rows: 1 }} />
        </div>
      </div>
    );
  }

  if (status.includes("failed")) {
    return (
      <div className="flex flex-col gap-y-1">
        <div className="text-[#999] text-[10px] md:text-[12px]">
          <TruncatedText title={name} className="text-[10px] md:text-[12px]">
            {name}
          </TruncatedText>
        </div>
        <div
          className={classNames(
            "align-middle font-bold text-[10px] md:text-[12px] h-[16px] md:h-[18px] text-[#EC6B5F]"
          )}
        >
          {"Failed"}
        </div>
      </div>
    );
  }

  return (
    <span className="flex flex-col gap-y-1 font-bold text-[#333] text-[10px] md:text-[12px]">
      <TruncatedText title={name} className="text-[10px] md:text-[12px]">
        {name}
      </TruncatedText>
      <span className="flex flex-row items-center gap-x-1 text-[#999] text-[10px] md:text-[12px]">
        <ArrowIcon />
        <TruncatedText
          title={newName ?? ""}
          className="text-[10px] md:text-[12px]"
        >
          {newName}
        </TruncatedText>
      </span>
    </span>
  );
};

export default FileName;
