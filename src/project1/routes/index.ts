import { blockRouter } from './block';
import { blocksRouter } from './blocks';
import { requestValidationRouter } from './requestValidation';
import { submitStarRouter } from './submitStar';

export const configureRoutes = (app: any) => {
  app.use('/block', blockRouter);
  app.use('/blocks', blocksRouter);
  app.use('/requestValidation', requestValidationRouter);
  app.use('/submitStar', submitStarRouter);

  return app;
};
