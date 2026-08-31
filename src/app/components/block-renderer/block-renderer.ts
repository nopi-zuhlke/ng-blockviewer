import { Component, computed, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { createBlockComponentType } from '../../blocks/block-factory';
import type { TreeNode } from '../../blocks/nodetype';

@Component({
  selector: 'app-block-renderer',
  imports: [NgComponentOutlet],
  template: `
    @if (componentType(); as component) {
      <ng-container *ngComponentOutlet="component; inputs: componentInputs()"></ng-container>
    } @else {
      <div role="alert" class="block rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        Unsupported block type: {{ node().type }}
      </div>
    }
  `,
})
export class BlockRenderer {
  public readonly node = input.required<TreeNode>();

  protected readonly componentType = computed(() => createBlockComponentType(this.node()));

  protected readonly componentInputs = computed(() => ({ node: this.node() }));
}
