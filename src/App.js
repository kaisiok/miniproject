import { useState } from "react";
import data from "./dummy";
import SearchBar from "./components/SearchBar";
import Reservations from "./components/Reservations";
import "./App.css"


function App() {
  const [schedules,setSchedules]=useState(data)

  const searchByName = (name) =>{
    //이 함수가 실행되면 schedules의 값이 달라져야 합니다.
   
  }


  return (
    <div className="outer" id="outer-warpper">
      <div className="inner">
        <h2>진료 시간 예약하기</h2>
        <SearchBar />
        <div className="table_top_wrapper">
          <div id="table_top1">이름</div>
          <div id="table_top2">진료 시간</div>
          <div id="table_top3">예약</div>
        </div>
        <Reservations />
      </div>
    </div>
  )
}

export default App;
