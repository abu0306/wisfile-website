import FileUploader from "../Upload";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useFiles } from "@/contexts/FileContext";
import { useEffect, useState } from "react";
import classNames from "classnames";
import RenameList from "../RenameList";
import { logEvent } from "@/utils/eventLogger";
const Renaming = () => {
  const { addFiles } = useFiles();
  const data = useSelector((state: RootState) => state.rename.files);
  const [renamed, setRenamed] = useState<boolean>(false);

  useEffect(() => {
    if (data.length == 0) {
      setRenamed(false);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center mb-[60px] md:mb-[100px] px-4 md:px-0 w-full max-w-5xl">
      <div className="flex justify-center px-4 md:px-0 text-[#666] text-[16px] md:text-[20px] text-center">
        <div className="whitespace-pre-line md:whitespace-pre">
          {`Try our AI  renaming for free. \nWant to enjoy the advanced naming convention, please download the desktop version.`}
        </div>
      </div>
      {!renamed && (
        <>
          <FileUploader
            onFilesSelected={(files) => {
              addFiles(files);
            }}
          />
          <div
            className={classNames(
              "flex justify-center items-center bg-[#FFB952] mt-[30px] md:mt-[40px] rounded-[24px] md:rounded-[32px] w-[160px] md:w-[198px] h-[50px] md:h-[62px] text-[#333] text-[14px] md:text-[16px]",
              {
                "cursor-not-allowed opacity-50": data.length === 0,
                "cursor-pointer": data.length > 0,
              }
            )}
            onClick={() => {
              if (data.length > 0) {
                logEvent("file_rename", {
                  file_count: data.length,
                });
                setRenamed(true);
                console.log("Renaming files:", data);
              }
            }}
          >
            Rename
          </div>
        </>
      )}

      {renamed && <RenameList />}
    </div>
  );
};

export default Renaming;
