import {createContext, useReducer} from "react"
export const EventsContext = createContext()
export const eventsReducer =(state,action) =>{
switch (action.type){
    case "SET_EVENTS":
        return {
            events : action.payload
        }
        case "CREATE_EVENTS":
            return {
                events : [action.payload, ...state.events]
            }
            case "DELETE_EVENTS":
                return {
                    events : state.events.filter((w) => w._id !== action.payload._id)
                }
        default:
            return state
    
}
}
export const EventsContextProvider = ({children}) => {
        const [state, dispatch] = useReducer(eventsReducer,{
            events: null
        })
        //dispatch({type:"SET_EVENTS", payload: [{},{}]})
        return (
        <EventsContext.Provider value = {{...state, dispatch}}>
            {children}
        </EventsContext.Provider>
    )
}