import { TestBed } from '@angular/core/testing';

import { PageContainerService } from './page-container-service';

describe('PageContainerService', () => {
  let service: PageContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
