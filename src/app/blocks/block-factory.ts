import { BaseBlockComponent } from './base-block.component';
import { resolveBlockComponentType, type BlockComponentConstructor } from './block-registry';
import type { TreeNode } from './nodetype';

export function createBlockComponentType(node: TreeNode): BlockComponentConstructor | undefined {
  return resolveBlockComponentType(node.type);
}

export { BaseBlockComponent };
