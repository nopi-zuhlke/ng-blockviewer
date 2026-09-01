import { Component, computed } from '@angular/core';
import { BlockRenderer } from '../../components/block-renderer/block-renderer';
import { registerBlockComponent } from '../block-registry';
import { BaseBlockComponent } from '../base-block.component';
import type { NodeType, TreeNode } from '../nodetype';

@Component({
  selector: 'app-grid-block',
  imports: [BlockRenderer],
  templateUrl: './grid-block.component.html',
})
export class GridBlockComponent extends BaseBlockComponent<TreeNode> {

  public readonly columns = computed(() => {
    const columns = this.getContentValue('columns');
    return typeof columns === 'number' ? Math.max(1, columns) : 3;
  });

  public readonly columnClass = computed(() => `grid-cols-${this.columns()}`);

  public override get type(): NodeType {
    return 'Grid';
  }
}

registerBlockComponent(GridBlockComponent);
