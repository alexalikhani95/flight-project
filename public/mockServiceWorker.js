import { setupServer } from 'msw/node';
import {handlers} from '../utils/mockRequests'

const server = setupServer(...handlers);


export { server };