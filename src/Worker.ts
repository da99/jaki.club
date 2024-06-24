
import app from './Fetch.Worker.ts';
import { email } from './Email.Worker.ts';


export default { fetch: app.fetch, email };
