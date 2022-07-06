import { combineReducers } from 'redux'
import itemReducers from './item.reducer'
import userReducers from './user.reducer'
import homeReducers from './home.reducer';
export default combineReducers({
    itemReducers,
    userReducers,
    homeReducers
})