import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

let totalRequest = 0;
let requestCompleted = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();
  totalRequest++;

  return next(req).pipe(finalize(() => {
    requestCompleted++;

    if (totalRequest === requestCompleted) {
      totalRequest = 0;
      requestCompleted = 0;
      loadingService.hide();
    }
  }));
};
