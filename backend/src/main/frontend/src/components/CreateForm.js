import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/board-create.css";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [skillStack, setSkillStack] = useState("React");
  const [workField, setWorkField] = useState("Frontend");
  const [maxPeople, setMaxPeople] = useState("1명");
  const [endDate, setEndDate] = useState("1개월");
  const [content, setContent] = useState("");
  const [postEndDate, setPostEndDate] = useState("");
  const navigate = useNavigate();

  /** 마감일 최소값 구하기 */
  const getDate = (e) => {
    let now = new Date();
    let year = String(now.getFullYear());
    let todayMonth = String(now.getMonth() + 1);
    let todayDate = String(now.getDate());
    if (todayMonth.length < 2) {
      todayMonth = "0" + todayMonth;
    }
    if (todayDate.length < 2) {
      todayDate = "0" + todayDate;
    }
    let check = `${year}-${todayMonth}-${todayDate}`;
    setPostEndDate(check);
    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value = check;
    dateControl.min = check;
  };

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeSkillStack = useCallback((e) => {
    setSkillStack(e.target.value);
  }, []);

  const onChangeWorkField = useCallback((e) => {
    setWorkField(e.target.value);
  }, []);

  const onChangeMaxPeople = useCallback((e) => {
    setMaxPeople(e.target.value);
  }, []);

  const onChangeEndDate = useCallback((e) => {
    setEndDate(e.target.value);
  }, []);

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  /** 글을 생성할 때, 내용들을 API로 전달 */
  const createSubmitHandler = (e) => {
    const params = new URLSearchParams();
    params.append("title", title);
    params.append("skillStack", skillStack);
    params.append("workField", workField);
    params.append("maxPeople", maxPeople);
    params.append("endDate", endDate);
    params.append("content", content);
    params.append("postEndDate", postEndDate);
    axios.post(`/api/board/create`, params);
    e.preventDefault();
    navigate("/board/list");
    alert("글 작성 완료!");
  };

  useEffect(() => {
    getDate();
  }, []);
  return (
    <div class="default_form">
      <form method="post" onSubmit={createSubmitHandler}>
        <ul>
          <li class="default_form_title">
            <b>제목</b>
            <input type="text" name="title" onChange={onChangeTitle} />
          </li>
          <li class="default_form_field">
            <label for="skillStack">
              <b>사용 언어</b>
            </label>
            <select name="skillStack" onChange={onChangeSkillStack}>
              <option value="React">React</option>
              <option value="Spring">Spring</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
            </select>
          </li>
          <li class="default_form_field">
            <label for="workField">
              <b>분야</b>
            </label>
            <select name="workField" onChange={onChangeWorkField}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </li>
          <li class="default_form_field">
            <label for="maxPeople">
              <b>모집 인원</b>
            </label>
            <select name="maxPeople" onChange={onChangeMaxPeople}>
              <option value="1명">1명</option>
              <option value="2명">2명</option>
              <option value="3명">3명</option>
              <option value="4명">4명</option>
              <option value="5명">5명</option>
              <option value="6명">6명</option>
              <option value="7명">7명</option>
              <option value="8명">8명 이상</option>
            </select>
          </li>
          <li class="default_form_field">
            <label for="endDate">
              <b>예상 기간</b>
            </label>
            <select name="endDate" onChange={onChangeEndDate}>
              <option value="1개월">1개월</option>
              <option value="2개월">2개월</option>
              <option value="3개월">3개월</option>
              <option value="4개월">4개월</option>
              <option value="5개월">5개월</option>
              <option value="6개월 이상">6개월 이상</option>
            </select>
          </li>
          <li class="default_form_field">
            <label for="postEndDate">
              <b>마감일</b>
            </label>
            <input
              type="date"
              name="postEndDate"
              onChange={(e) => {
                setPostEndDate(e.target.value);
              }}
            ></input>
          </li>
        </ul>
        <textarea
          class="create_board"
          name="content"
          onChange={onChangeContent}
        ></textarea>
        <input class="submit" type="submit" value="저장" />
      </form>
    </div>
  );
}

export default CreateForm;
