import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App"
import data from "../dummy"
import { resq$ } from "resq"
import Reservations from "../components/Reservations"
import SearchBar from "../components/SearchBar"


describe("props를 전달하고 전달받은 데이터를 map을 사용해 화면에 표시해야 합니다.",()=>{

	test("Reservations컴포넌트는 schedules라는 props를 전달 받아야 합니다.",()=>{
		render(<App/>)
		const props = resq$("Reservations", document.querySelector("#outer-warpper")).props.schedules
		expect(props).toBeTruthy()
	})

	test("최초 실행했을 때 16개의 예약 목록이 보여야 합니다.",()=>{
		const {container}=render(<App/>)
		const reservationList =container.getElementsByClassName("reservation_row")
		expect(reservationList.length).toBe(16)
	})

	test("예약 목록에 의사의 이름과 진료 가능 시간이 보여야 합니다.",()=>{
		render(<Reservations schedules={data}/>)
		const reservationName1 =screen.getAllByText("백현민")
		const reservationName2 =screen.getAllByText("김명훈")
		const reservationName3 =screen.getAllByText("장윤철")
		const reservationTime =screen.getAllByText(/2022-10-15/)

		expect(reservationName1.length).toBe(3)
		expect(reservationName2.length).toBe(8)
		expect(reservationName3.length).toBe(5)
		expect(reservationTime.length).toBe(16)
	})

	test("만약 다른 데이터 list가 props 로 전달되면 그 list를 보여줘야 합니다.",()=>{
		const list = [{id:1, doctor:"김코딩" , time:"2022-10-15 09:00~09:50"},{id:2, doctor:"박해커" , time:"2022-10-15 09:00~09:50"}]
		render(<Reservations schedules={list}/>)
		const reservations = screen.getAllByText(/김코딩|박해커/)

		expect(reservations.length).toBe(2)
		expect(reservations[0].textContent).toBe("김코딩")
		expect(reservations[1].textContent).toBe("박해커")
	})
})

describe("상태 끌어올리기를 이용하여 검색창에서 검색을 할 수 있어야 합니다.",()=>{

	test("searchByName함수를 searchByName라는 props로 SearchBar컴포넌트에 전달해야 합니다.",()=>{
		render(<App/>)
		const props = resq$("SearchBar", document.querySelector("#outer-warpper")).props.searchByName
		expect(typeof(props)).toBe("function")
		expect(props.name).toBe("searchByName")
	})

	test("SearchBar 컴포넌트의 handleSubmit 함수가 실행될 때 searchByName이 실행되야 합니다.",()=>{
		const searchByName = jest.fn();
		render(<SearchBar searchByName={searchByName} />)
		const button = screen.getByText("검색")
		fireEvent.click(button);
  
		expect(searchByName).toHaveBeenCalled();
	})

	test("검색창에 이름을 입력했을 때 입력한 이름만 화면에 보여야 합니다.",()=>{
		const {container}=render(<App/>)
		const input = screen.getByRole("textbox")
		const button = screen.getByText("검색")
		const reservationList =container.getElementsByClassName("reservation_row")
		
		fireEvent.change(input, {target: {value: "백현민"}})
		fireEvent.click(button)
		expect(reservationList.length).toBe(3)

		fireEvent.change(input, {target: {value: "김명훈"}})
		fireEvent.click(button)
		expect(reservationList.length).toBe(8)

		fireEvent.change(input, {target: {value: "장윤철"}})
		fireEvent.click(button)
		expect(reservationList.length).toBe(5)
	})

	test("검색창에 아무것도 입력하지 않고 검색했을 때 전체 목록이 보여야 합니다.",()=>{
		const {container}=render(<App/>)
		const input = screen.getByRole("textbox")
		const button = screen.getByText("검색")
		const reservationList =container.getElementsByClassName("reservation_row")

		fireEvent.change(input, {target: {value: "백현민"}})
		fireEvent.click(button)
		expect(reservationList.length).toBe(3)

		fireEvent.change(input, {target: {value: ""}})
		fireEvent.click(button)
		expect(reservationList.length).toBe(16)
	})
})