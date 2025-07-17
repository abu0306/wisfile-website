import { Table } from "antd";
import { columns } from "./var";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useFiles } from "@/contexts/FileContext";
import { isEqual } from "lodash";

const RenameList = () => {
  const data = useSelector((state: RootState) => state.rename.files, isEqual);
  const { files, parseAndRenameFile } = useFiles();

  useEffect(() => {
    const newData = data.filter((item) => item.status === "pending");
    // 如果有新的文件，筛选files中的文件
    if (newData.length > 0) {
      const newFiles = files.filter((file) =>
        newData.some((item) => item.name === file.name)
      );
      // 更新状态
      newFiles.forEach((file) => {
        parseAndRenameFile(file);
      });
    }
  }, [data, files, parseAndRenameFile]);
  return (
    <div className="mt-[30px] md:mt-[50px] px-4 md:px-0 w-full">
      <div>
        <Table
          bordered
          columns={columns as any}
          dataSource={data}
          pagination={false}
          rowKey={(e) => e.name}
          size="small"
          className="text-xs md:text-sm"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="mt-[16px] md:mt-[24px] px-4 md:px-0 text-[#999] text-[14px] md:text-[18px] text-center whitespace-pre-wrap">
          {`The Online Demo only provides simulated results, it won't change the names of local files. \nThe default naming format for simulation is "Article Title— Author".\nTo experience all models and features, please download the local version.`}
        </span>
      </div>
    </div>
  );
};

export default RenameList;
