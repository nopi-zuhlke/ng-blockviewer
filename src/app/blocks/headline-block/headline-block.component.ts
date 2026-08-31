import { Component, computed } from '@angular/core';
import { registerBlockComponent } from '../block-registry';
import { BaseBlockComponent } from '../base-block.component';
import type { NodeType, TreeNode } from '../nodetype';

@Component({
  selector: 'app-headline-block',
  templateUrl: './headline-block.component.html',
})
export class HeadlineBlockComponent extends BaseBlockComponent<TreeNode> {

  public readonly headlineText = computed(() => {
    const text = this.node()?.content?.['text'];
    const headline = this.node()?.content?.['headline'];
    const value = typeof text === 'string' ? text : typeof headline === 'string' ? headline : 'Headline';
    return value.trim() || 'Headline';
  });

  public override get type(): NodeType {
    return 'Headline';
  }
}

registerBlockComponent(HeadlineBlockComponent);
