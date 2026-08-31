import { Component } from '@angular/core';
import { registerBlockComponent } from '../block-registry';
import { BaseBlockComponent } from '../base-block.component';
import type { NodeType, TreeNode } from '../nodetype';

@Component({
  selector: 'app-teaser-block',
  templateUrl: './teaser-block.component.html',
})
export class TeaserBlockComponent extends BaseBlockComponent<TreeNode> {

  public override get type(): NodeType {
    return 'Teaser';
  }

  public get teaserTitle(): string {
    return this.getStringContent('headline', this.getStringContent('title', 'Teaser'));
  }
}

registerBlockComponent(TeaserBlockComponent);
