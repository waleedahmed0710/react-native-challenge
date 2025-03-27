import { Middleware } from 'redux';
import { addToOfflineQueue, removeFromOfflineQueue } from '../slices/tasksSlice';
import { checkNetworkConnectivity } from '../../utils/network';
import { storageService } from '../../services/storage';
import { OfflineAction } from '../../types';
import { generateUUID } from '../../utils/uuid';


const OFFLINE_ACTIONS = [
  'tasks/createTask',
  'tasks/updateTask',
  'tasks/deleteTask',
  'categories/createCategory',
  'categories/updateCategory',
  'categories/deleteCategory',
];

const offlineMiddleware: Middleware = store => next => async action => {

  if (OFFLINE_ACTIONS.includes(action.type) && action.type.endsWith('/pending')) {
    const networkStatus = await checkNetworkConnectivity();
    
    if (!networkStatus.isConnected) {
      const offlineAction: OfflineAction = {
        id: generateUUID(),
        type: action.type,
        payload: action.payload,
        timestamp: Date.now(),
      };
      
      store.dispatch(addToOfflineQueue(offlineAction));
      await storageService.addToOfflineQueue(offlineAction);
      
      return next(action);
    }
    
    if (networkStatus.isConnected) {
      const offlineQueue = await storageService.getOfflineQueue();
      
      if (offlineQueue.length > 0) {

        for (const queuedAction of offlineQueue) {
          try {

            store.dispatch({ 
              type: queuedAction.type.replace('/pending', ''), 
              payload: queuedAction.payload 
            });
            
            store.dispatch(removeFromOfflineQueue(queuedAction.id));
            await storageService.removeFromOfflineQueue(queuedAction.id);
          } catch (error) {
            console.error('Failed to process offline action:', error);
          }
        }
      }
    }
  }
  

  return next(action);
};

export default offlineMiddleware;