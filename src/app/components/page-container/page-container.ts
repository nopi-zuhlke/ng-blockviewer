import { Component, inject } from '@angular/core';
import { BlockRenderer } from '../block-renderer/block-renderer';
import { PageContainerService } from '../../services/page-container-service';

@Component({
  selector: 'app-page-container',
  imports: [BlockRenderer],
  templateUrl: './page-container.html',
  styleUrl: './page-container.css',
})
export class PageContainer {
  private readonly pageContainerService = inject(PageContainerService);

  public readonly nodeTree = this.pageContainerService.nodeTree;
}
