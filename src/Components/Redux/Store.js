import { configureStore } from '@reduxjs/toolkit';
import  UserSlice  from './Slices/UserSlice';
import MasterSlice from './Slices/MasterSlice';
import secureLocalStorage from 'react-secure-storage';

const loadState=()=>{
    try{
        // const serializedState = sessionStorage.getItem('reduxState');
        const serializedState = secureLocalStorage.getItem('reduxState');

        if(serializedState==null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(e){
        return undefined;
    }
}

const saveState=(state)=>{
    try{
        const serializedState = JSON.stringify(state);
        // sessionStorage.setItem("reduxState",serializedState)
        secureLocalStorage.setItem("reduxState",serializedState)
    }catch(e){
        console.log(e);
    }

}

const store = configureStore({  
    reducer: {
        userItems: UserSlice,
        masterData:MasterSlice
    },
    preloadedState:loadState()
   
});

store.subscribe(()=>{
    saveState(store.getState());
})

export default store;
