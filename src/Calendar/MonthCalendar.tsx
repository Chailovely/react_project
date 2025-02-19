import { Dayjs } from 'dayjs';
import {CalendarProps} from '.'
import { useContext } from "react";
import cs from 'classnames';
import allLocales from './locale/inedx';
import LocaleContext from './LocaleContext';

interface MonthCalendarProps extends CalendarProps {
    selectHandler?: (date: Dayjs) => void;
    curMonth: Dayjs;
}

/**
 * 获取当前月份的所有日期
 * @param date 
 * @returns 
 */
function getAllDays(date: Dayjs){
    const daysInMonth = date.daysInMonth()
    const startDate = date.startOf('month')
    const day = startDate.day()

    const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6*7)

    for(let i = 0; i < day; i++){
        daysInfo[i] = {
            date:startDate.subtract(day - i, 'day'),
            currentMonth:false
        }

    }

    for(let i = day; i < daysInfo.length; i++){
        const itemDate = startDate.add(i - day, 'day')
        daysInfo[i] = {
            date:itemDate,
            currentMonth:itemDate.month() === date.month()
        }
    }
    
    return daysInfo
}

/**
 * 渲染日期
 * @param days 
 * @returns 
 */
function renderDays(
    days: Array<{date: Dayjs, currentMonth: boolean}>,
    dateRender: MonthCalendarProps['dateRender'],
    dateInnerContent: MonthCalendarProps['dateInnerContent'],
    value: Dayjs,
    selectHandler: MonthCalendarProps['selectHandler']
){

    const rows = [];
    for(let i = 0; i < 6; i ++){
        const row = []
        for(let j = 0; j < 7; j++){
            const item = days[i * 7 + j];
            row[j] = <div className={
                `calendar-month-body-cell ${item.currentMonth ? 'calendar-month-body-cell-current' : ''}`
                } 
                key={i * 7 + j}
                onClick={() => selectHandler?.(item.date)}
            >
                {
                    dateRender?dateRender(item.date):(
                        <div className={
                            cs('calendar-month-body-cell-date',
                                value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') ? 
                                'calendar-month-body-cell-date-selected' : ''
                            )
                        }>
                            <div className='calendar-month-body-cell-date-value'>{item.date.date()}</div>
                            <div className='calendar-month-body-cell-date-content'>{dateInnerContent?.(item.date)}</div>
                        </div>
                    )
                }
            </div>
        }
        rows.push(row)
    }
    return rows.map((row, index) => (
        <div className="calendar-month-body-row" key={index}>
            {row}
        </div>
    ))
}


function MonthCalendar(props: MonthCalendarProps) {

    const localeContext = useContext(LocaleContext);

    const{
        value,
        curMonth,
        dateRender,
        dateInnerContent,
        selectHandler
    } = props

    const CalendarLocale = allLocales[localeContext.locale];

    const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    const allDays = getAllDays(curMonth)
    
    return <div className="calendar-month">
        <div className="calendar-month-week-list">
            {weekList.map((week) => (
                <div className="calendar-month-week-list-item" key={week}>
                    {CalendarLocale.week[week]}
                </div>
            ))}
        </div>
        <div className='calendar-month-body'>
            {
                renderDays(allDays,dateRender,dateInnerContent,value,selectHandler)
            }
        </div>
    </div>
}

export default MonthCalendar;
