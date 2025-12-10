//store
const redux= require("redux")

const {createStore,combineReducers}=redux


//actions

const BUY_PRODUCT="BUY_PRODUCT"
const RESTOCK_PRODUCTS="RESTOCK_PRODUCTS"
const ADD_PRODUCT_TO_BASKET="ADD_PRODUCT_TO_BASKET"
const RESET_BASKET="RESET_BASKET"

const buyProduct=(quantity)=>{
    return {
        type:BUY_PRODUCT,
        payload:quantity
    }
}

const restockProduct=(quantity)=>{
    return {
        type:RESTOCK_PRODUCTS,
        payload:quantity
    }
}

const addProduct=(product)=>{
    return {
        type:ADD_PRODUCT_TO_BASKET,
        payload:product
    }
}


const resetBasket=()=>{
    return {
        type:RESET_BASKET
    }
}

//reducers
const productInitalState={
    count:0,
    otherProperty:40
}

const productReducer=(state=productInitalState,action)=>{
    switch(action.type)
    { 
        case BUY_PRODUCT:
           return {...state,count:state.count-action.payload };  
        case RESTOCK_PRODUCTS:
          return {...state,count:state.count+action.payload}; 
        default:
            return state;
    }
}

const basketInitState={
    basket:[]
}

const basketReducer=(state=basketInitState,action)=>{
    switch(action.type)
    { 
        case ADD_PRODUCT_TO_BASKET:
            return {...state , basket:[...state.basket,action.payload]}
        case RESET_BASKET:
            return {...state,basket:[]}
        default:
            return state;
    }
}

//store
const rootReducer=combineReducers({
    productReducer:productReducer,
    basketReducer:basketReducer
})

const store=createStore(rootReducer);


console.log("initState",store.getState())


const unSubscribe=store.subscribe(()=>{
    console.log("update state",store.getState())
})

store.dispatch(restockProduct(10))
store.dispatch(buyProduct(2))
store.dispatch(buyProduct(1))

//unSubscribe()

store.dispatch(addProduct("car"))
store.dispatch(addProduct("ball"))
store.dispatch(resetBasket())