import styled from 'styled-components';
import { Calendar as CalendarBig } from 'react-big-calendar';
export const WrapContainer = styled(CalendarBig)`
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  > .rbc-time-view {
    border: none;
    & .rbc-time-header {
      border: none;
      > .rbc-time-header-content {
        border: 1px solid #ddd;
        border-bottom: unset;
        border-top-right-radius: 18px;
        border-top-left-radius: 18px;

        > .rbc-row {
          > .rbc-header {
            padding: 25px 0;
          }
        }

        > .rbc-allday-cell {
        display: none;
      }
      }
      
    }
    & .rbc-allday-cell {
      height: 26px;
    }

    & .rbc-time-content {
      border: none;
      ::-webkit-scrollbar-thumb {
        height: 100px;
      }
      & .rbc-time-column {
        &:last-child {
          border-right: 1px solid #ddd;
          border-bottom-right-radius: 18px;
        }

        > .rbc-timeslot-group {
          flex: unset;
          height: 150px;
          border-left: 1px solid #ddd;
          margin-left: -0.2px;
          > .rbc-time-slot {
            border: none;
          }
        }

        > .rbc-current-time-indicator {
          background-color: unset;
        }
      }

      & .rbc-time-gutter {
        > .rbc-timeslot-group {
          border: none;
        }
      }
    }
  }

  > .rbc-time-view .rbc-today {
    background-color: unset;
  }

  > .rbc-time-view .rbc-time-content > * + * > * {
    border-left: none;
  }

  > .rbc-time-view .rbc-day-slot {
    &:nth-child(2) {
      > :nth-last-child(2) {
        border-bottom-left-radius: 18px;
      }
    }

    &:last-child {
      > :nth-last-child(2) {
        border-bottom-right-radius: 18px;
      }
    }
  }

  > .rbc-time-view .rbc-event-label {
    display: none;
  }

  > .rbc-time-view .rbc-event {
    background-color: unset;
    border: none;
    padding: 0 2px;
  }
  > .rbc-time-view .rbc-events-container {
    margin-right: 0;
    & .rbc-event {
      min-height: 0.8% !important;
    }
  }
`;
