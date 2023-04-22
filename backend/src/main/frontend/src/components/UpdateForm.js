import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateForm() {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [skillStack, setSkillStack] = useState("");
  const [workField, setWorkField] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [postEndDate, setPostEndDate] = useState("");

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

  const updateSubmitHandler = (e) => {
    const params = new URLSearchParams();
    params.append("title", title);
    params.append("skillStack", skillStack);
    params.append("workField", workField);
    params.append("maxPeople", maxPeople);
    params.append("endDate", endDate);
    params.append("content", content);
    params.append("postEndDate", postEndDate);
    axios.post(`/api/board/update/${id}`, params);
    window.location.href = `/detail/${id}`;
    alert("수정 완료!");
  };
  /** 제목 값 변경 */
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
  /** 셀렉트의 옵션을 선택하게 하는 함수
   * 셀렉트를 전체 선택 후 selectedValue안의 값으로 selected한다.
   */
  const selectOption = (e) => {
    var opt = document.querySelectorAll(".select");
    var selectedValue = [skillStack, workField, maxPeople, endDate];
    for (var i = 0; i < opt.length; i++) {
      for (var j = 0; j < opt[i].length; j++) {
        if (opt[i][j].value === selectedValue[i]) {
          opt[i][j].setAttribute("selected", true);
          break;
        }
      }
    }
  };

  selectOption();
  useEffect(() => {
    getDate();
    // 글 내용 불러오기
    axios.get(`/api/board/detail/${id}`).then((res) => {
      setTitle(res.data.title);
      setSkillStack(res.data.skillStack);
      setWorkField(res.data.workField);
      setMaxPeople(res.data.maxPeople);
      setEndDate(res.data.endDate);
      setContent(res.data.content);
      setPostEndDate(res.data.postEndDate);
    });
  }, []);

  return (
    <>
      <div class="default_form">
        <form onSubmit={updateSubmitHandler}>
          <ul>
            <li class="default_form_title">
              <span>제목</span>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChangeTitle}
              />
            </li>
            <li class="default_form_field">
              <label for="skillStack">사용 언어</label>
              <select
                class="select"
                name="skillStack"
                onChange={onChangeSkillStack}
              >
                <option value="React">React</option>
                <option value="Spring">Spring</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
              </select>
            </li>
            <li class="default_form_field">
              <label for="workField">분야</label>
              <select
                class="select"
                name="workField"
                onChange={onChangeWorkField}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </li>
            <li class="default_form_field">
              <label for="maxPeople">모집 인원</label>
              <select
                class="select"
                name="maxPeople"
                onChange={onChangeMaxPeople}
              >
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
              <label for="endDate">예상 기간</label>
              <select class="select" name="endDate" onChange={onChangeEndDate}>
                <option value="1개월">1개월</option>
                <option value="2개월">2개월</option>
                <option value="3개월">3개월</option>
                <option value="4개월">4개월</option>
                <option value="5개월">5개월</option>
                <option value="6개월 이상">6개월 이상</option>
              </select>
            </li>
            <li class="default_form_field">
              <label for="postEndDate">마감일</label>
              <input
                type="date"
                name="postEndDate"
                value={postEndDate}
                onChange={(e) => {
                  setPostEndDate(e.target.value);
                }}
              ></input>
            </li>
          </ul>
          <textarea
            class="create_board"
            name="content"
            value={content}
            onChange={onChangeContent}
          ></textarea>
          <input class="submit" type="submit" />
        </form>
      </div>
    </>
  );
}

export default UpdateForm;
