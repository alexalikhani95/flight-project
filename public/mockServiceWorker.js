import { setupServer } from 'msw/node';
import {handlers} from '../utils/handlers'

const server = setupServer(...handlers);


export { server };

