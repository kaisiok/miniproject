function Reservation({doctor="hello",time="world"}){
    return (
    <div className="reservation_row">
        <div id="reservation_col1" className="reservation_col">{doctor}</div>
        <div id="reservation_col2" className="reservation_col">{time}</div>
        <div id="reservation_col3" className="reservation_col">
            <button onClick={()=>{console.log("예약")}}>예약하기</button>
        </div>
    </div>
    )
}
export default Reservation