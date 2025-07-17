import FileName from "./FileName";
import Del from "./Del";

export const columns = [
  {
    title: "Renaming",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    render: (text: string, record: any) => {
      return <FileName record={record} />;
    },
  },
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
    align: "center",
    width: 100,
    render: (text: string, record: any) => {
      return <Del record={record} />;
    },
  },
];
