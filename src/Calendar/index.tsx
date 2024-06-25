import { CSSProperties, ReactNode, useState } from 'react';
import cs from 'classnames'
import { Dayjs } from 'dayjs';
import MonthCalendar from './MonthCalendar';
import Header from './Header';
import './index.scss';
import LocaleContext from './LocaleContext';


export interface CalendarProps {
    value:Dayjs;
    style?:CSSProperties;
    className?:string | string[];
    // 自定义日期渲染，会完全覆盖日期单元格
    
    dateRender?:(currentDate: Dayjs) => ReactNode;
    // 自定义日期内层内容 内容被添加到单元格内，只在全屏日历模式下生效 
    dateInnerContent?:(currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {

    const{
        value,
        style,
        className,
        locale,
        onChange,
    } = props

    const [curValue, setCurValue] = useState<Dayjs>(value);

    const [curMonth, setcurMonth] = useState<Dayjs>(value);

    const classes = cs('calendar', className)

    function selectHandler(date: Dayjs) {
        setCurValue(date);
        onChange?.(date);
    }

    function preMonthHandler() {
        setcurMonth(curMonth.subtract(1, 'month'));
    }
    function nextMonthHandler (){
        setcurMonth(curMonth.add(1, 'month'));
    }

    return <LocaleContext.Provider value={{
        locale: locale || navigator.language
    }}>
        <div className={classes} style={style}>
            <Header curMonth={curMonth} preMonthHandler={preMonthHandler} nextMonthHandler={nextMonthHandler}/>
            <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler}/>
        </div>
    </LocaleContext.Provider>
}

export default Calendar;
