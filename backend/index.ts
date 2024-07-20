import { createApp } from './app';
import config from './config';


if (require.main === module) {
  (async () => {
    try {
      const port = config.SERVICE_PORT;
      const app = await createApp();
      app.listen(port);
      console.log(`listening on port: ${port}`);
    } catch (error) {
      console.error(`error when starting server: ${error.stack}`);
    }
  })();
}

export default createApp;
