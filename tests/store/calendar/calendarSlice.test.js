import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Prueba en el calendarSlice', () => {
  
    test('debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState )
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer( calendarWithActiveEventState, onSetActiveEvent( events[0] ) );
        expect( state.activeEvent ).toEqual( events[0] );
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '1',
            start: new Date('2023-10-21 13:00:00'),
            end: new Date('2023-10-21 15:00:00'),
            title: 'Cumpleaños de Keimy',
            notes: 'Comprar regalo',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));
        expect( state.events ).toEqual([ ...events, newEvent ]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {
        const updateEvent = {
            id: '1',
            start: new Date('2023-09-21 13:00:00'),
            end: new Date('2023-09-21 15:00:00'),
            title: 'Cumpleaños de Angela',
            notes: 'Comprar la torta',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updateEvent ));
        expect( state.events ).toContain( updateEvent );
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.activeEvent ).toBe(null);
        expect( state.events ).not.toContain( events[0] );
    });

    test('onLoadEvents debe de establecer los eventos', () => {

        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual( events);

        const newState =  calendarSlice.reducer( state, onLoadEvents( events ));
        expect( state.events.length ).toBe( events.length );
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    });

});
