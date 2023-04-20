import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/detail-page.css";
import axios from "axios";

function DetailPage() {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [skillStack, setSkillStack] = useState("");
  const [workField, setWorkField] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [answerList, setAnswerList] = useState([]);

  const answerHandler = (e) => {
    const params = new URLSearchParams();
    params.append("content", answerContent);
    axios.post(`/api/answer/create/${id}`, params);
    window.location.href = `/detail/${id}`;
  };

  const getAnswerList = (e) => {
    axios
      .get(`/api/answer/detail/${id}`)
      .then((res) => {
        setAnswerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 글 내용 불러오기
    axios.get(`/api/board/detail/${id}`).then((res) => {
      setTitle(res.data.title);
      setName(res.data.name);
      setCreateDate(res.data.createDate.slice(0, 10));
      setSkillStack(res.data.skillStack);
      setWorkField(res.data.workField);
      setMaxPeople(res.data.maxPeople);
      setEndDate(res.data.endDate);
      setContent(res.data.content);
    });
    // 댓글 불러오기
    getAnswerList();
  }, []);
  return (
    <>
      {/* 상세 내용 */}
      <div class="detail_board">
        <table>
          <tr>
            <td class="title">{title}</td>
          </tr>
          <tr>
            <td class="createDate">
              <b>작성일 </b>
              {createDate}
            </td>
            <td class="author">
              <b>작성자 </b>
              {id}
            </td>
            <td class="workField">
              <b>분야 </b>
              {workField}
            </td>
            <td class="skillStack">
              <b>사용 언어</b> {skillStack}
            </td>
            <td class="maxPeople">
              <b>모집 인원</b> {maxPeople}
            </td>
            <td>
              <b>예상 기간 </b>
              {endDate}
            </td>
          </tr>
          <tr class="content">
            <td>{content}</td>
          </tr>
          <div>
            <button
              onClick={() => {
                axios
                  .get(`/api/board/delete?id=${id}`)
                  .then((res) => {
                    alert("삭제 완료");
                    window.location.href = "/board/list";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              삭제
            </button>
            <button onClick={(e) => (window.location.href = `/update/${id}`)}>
              <Link to={`/update/${id}`} style={{ textDecoration: "none" }}>
                수정
              </Link>
            </button>
          </div>
        </table>
        <div>
          {/* 댓글 입력 창 */}
          <form class="answer_form" onSubmit={answerHandler}>
            댓글
            <textarea
              class="answer_content"
              onChange={(e) => {
                setAnswerContent(e.target.value);
              }}
              spellcheck="false"
            ></textarea>
            <input type="submit" />
          </form>
          {/* 댓글 목록 */}
          <div class="answer_list">
            {answerList.map(function (lists, idx) {
              return (
                <>
                  <div class="answer_list_items">
                    {answerList[idx].content}
                    <button>삭제</button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
