import Reservation from "./Reservation"

function Reservations({schedules}){
    return (
        <div className="schedules-wraper">
            {/* map 메서드를 이용하여 Reservation을 화면에 나타나게 해 보세요 */}
            {schedules.map((el)=>{
                return <Reservation key={el.id} doctor={el.doctor} time={el.time}/>
            })}
        </div>
    )

}
export default Reservations