import React from '../../../node_modules/_react@16.4.1@react'
import { Calendar, Badge } from '../../../node_modules/_antd@3.7.3@antd';

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: '议案完成反馈.' },
                { type: 'success', content: '议案完成.' },
            ]; break;
        case 10:
            listData = [
                { type: 'warning', content: '议案完成反馈.' },
                { type: 'success', content: '议案完成.' },
                { type: 'error', content: '议案逾期.' },
            ]; break;
        case 15:
            listData = [
                { type: 'warning', content: '议案完成反馈' },
                { type: 'success', content: '议案完成' },
                { type: 'error', content: '议案逾期1.' },
                { type: 'error', content: '议案逾期2.' },
                { type: 'error', content: '议案逾期3.' },
                { type: 'error', content: '议案逾期4.' },
            ]; break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {
                listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))
            }
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}
function index(props){
    return(
        <Calendar style={{ border: "1px solid #ebebeb"}} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    )
}
export default index;

