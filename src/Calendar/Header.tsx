import {Dayjs} from 'dayjs';

interface HeaderProps {
    curMonth: Dayjs;
    preMonthHandler: () => void;
    nextMonthHandler: () => void;
}


function Header(props: HeaderProps) {

    const{
        curMonth,
        preMonthHandler,
        nextMonthHandler,
    } = props

    return <div className="calendar-header">
        <div className="calendar-header-left">
            <div className="calendar-header-icon" onClick={preMonthHandler}>&lt;</div>
            <div className="calendar-header-value">{curMonth.format('YYYY年MM月')}</div>
            <div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
            <button className="calendar-header-btn">今天</button>
        </div>
    </div>
}

export default Header;
