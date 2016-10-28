
export interface ITreeListDataSourceNode {
    title: string | React.ReactNode;
    key: string | number;
    children?: ITreeListDataSourceNode[];
    folder?: boolean;
    data?: any;
}

// export interface DataSourceColumn extends GridColumnProps {
//
// }
//
// export interface DataSourceColumnGroup extends GridColumnGroupProps {
//     columns: (DataSourceColumn | DataSourceColumnGroup)[];
// }

export interface ITreeListDataSource<TRow extends ITreeListDataSourceNode> {
    getNodes(): Promise<TRow[]>;
}

