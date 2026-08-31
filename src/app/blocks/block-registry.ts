import { Type } from '@angular/core';
import { BaseBlockComponent } from './base-block.component';
import type { NodeType, TreeNode } from './nodetype';

export type BlockComponentConstructor<TBlock extends BaseBlockComponent<TreeNode> = BaseBlockComponent<TreeNode>> = Type<TBlock>;

const registry = new Map<NodeType, BlockComponentConstructor>();

export function registerBlockComponent<TBlock extends BaseBlockComponent<TreeNode>>(ctor: BlockComponentConstructor<TBlock>): void {
  const type = ctor.prototype.type;
  registry.set(type, ctor);
}

export function resolveBlockComponentType(type: NodeType): BlockComponentConstructor | undefined {
  return registry.get(type);
}
