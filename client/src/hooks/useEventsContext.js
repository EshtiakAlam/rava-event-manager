import { useContext } from 'react';
import { AdminEventsContext } from '../context/AdminEventContext';

export const useEventsContext = () => {
    const context = useContext(AdminEventsContext);
    if (!context) {
        throw new Error('useEventsContext must be used within an EventsContextProvider');
    }
    return context;
};

export default useEventsContext;
