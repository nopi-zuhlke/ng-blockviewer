import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import './blocks';
import { PageContainer } from './components/page-container/page-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
