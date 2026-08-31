import { computed, Directive, input } from '@angular/core';
import type { NodeType, TreeNode } from './nodetype';

@Directive()
export abstract class BaseBlockComponent<TNode extends TreeNode = TreeNode> {
  public readonly node = input<TNode | null>(null);

  public abstract get type(): NodeType;

  public get id(): string {
    return this.node()?.id ?? '';
  }

  public readonly content = computed<Record<string, unknown>>(() => this.node()?.content ?? {});

  public readonly children = computed<TNode['children']>(() => this.node()?.children ?? []);

  public hasChildren(): boolean {
    return this.children().length > 0;
  }

  public getContentValue(key: string): unknown {
    return this.content()[key];
  }

  public getStringContent(key: string, fallback = ''): string {
    const value = this.content()[key];
    return typeof value === 'string' ? value : fallback;
  }
}
