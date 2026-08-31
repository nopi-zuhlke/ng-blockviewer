export type NodeType = 'Headline' | 'Grid' | 'Card' | 'Carousel' | 'Teaser';

export interface TreeNode {
  id: string;
  type: NodeType;
  parentId: string | null;
  content: Record<string, unknown>;
  children: TreeNode[];
}

export type NodeTree = TreeNode[];
