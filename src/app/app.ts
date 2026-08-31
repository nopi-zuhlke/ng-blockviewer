import { Component } from '@angular/core';
import './blocks';
import { PageContainer } from './components/page-container/page-container';

@Component({
  selector: 'app-root',
  imports: [PageContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
