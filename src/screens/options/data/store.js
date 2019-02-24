import { createStore } from 'redux';
import requestHandlerApp from './redurcers';

const store = createStore(requestHandlerApp);

export default store;
