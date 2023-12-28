import { Breakpoint } from "antd";
import { SortOrder } from "antd/es/table/interface";
import { ReactElement } from "react";
interface SortableItem {
  [key: string]: number | string | any;
}

export interface ColumnsProps {
  title?: ReactElement<any, any>;
  dataIndex?: string;
  key?: string;
  sortDirections?: SortOrder[] | undefined;
  sorter?: (item2: SortableItem, item1: SortableItem) => number;
  render?: (text?: string, record?: any, _?: number) => any;
  responsive?: Breakpoint[] | undefined;
}
