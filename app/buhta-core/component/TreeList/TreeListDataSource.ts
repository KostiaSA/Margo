
export interface ITreeListDataSourceNode {
    readonly title: string;
    readonly key: string | number;
    readonly children?: ITreeListDataSourceNode[];
    readonly folder?: boolean;
    readonly data?: any;
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

