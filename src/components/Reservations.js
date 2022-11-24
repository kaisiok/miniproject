import Reservation from "./Reservation"

function Reservations({list}){
    return (
        list.map((el)=>{
            return <Reservation key={el.id} doctor={el.doctor} time={el.time}/>
        })
    )

}
export default Reservations