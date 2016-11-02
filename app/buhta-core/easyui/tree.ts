export interface IEasyTreeNode {
    id?: string | number;
    text: string;
    state?: "opened" | "closed";
    children?: IEasyTreeNode[]
}
