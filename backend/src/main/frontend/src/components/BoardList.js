import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import Magnifier from "../img/pngwing.com.png";
import "../css/board-list.css";

function BoardList() {
  const [totalList, setTotalList] = useState([]);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [fixSearch, setFixSearch] = useState("");
  const [search, setSearch] = useState("");
  const [answerCntList, setAnswerCntList] = useState("");
  /** 검색한 경우 fixSearch 값 변경*/
  const keyWordChange = (e) => {
    e.preventDefault();
    setFixSearch(search);
    window.scrollTo(0, 0);
  };

  /** 페이지 이동
   * 1. 스크롤 위로 올라가게 함
   *
   * 2. 페이지 변경
   *
   * 3. 화면 출력 리스트 변경
   */
  const pageChangeHandler = async (page) => {
    setPage(page);
    setList(totalList.slice((page - 1) * 20, page * 20));
    window.scrollTo(0, 0);
  };
  /** 초기 상태 */
  const getList = async () => {
    await axios
      .get("/api/board/list")
      .then((res) => {
        setTotalList(res.data);
        setList(res.data.slice(0, 20));
        setCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** 검색 상태 */
  const searchList = async (keyword) => {
    await axios
      .get("/api/board/list/search", { params: { title: keyword } })
      .then((res) => {
        setTotalList(res.data);
        setList(res.data.slice(0, 20));
        setCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setPage(1);
    // 검색한 내용이 있는 경우
    if (fixSearch) {
      searchList(fixSearch);
    }
    // 검색한 내용이 없는 경우
    else {
      getList();
    }
  }, [fixSearch]);
  return (
    <>
      {/* 검색창 */}
      <form id="main_search" onSubmit={keyWordChange}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <input type="image" src={Magnifier} alt="검색" />
      </form>
      {/* Post 내용 */}
      <div class="board_list_div">
        <table class="board_list_table">
          {list.map(function (lists, i) {
            return (
              <>
                <tr
                  class="board_list"
                  onClick={(e) => {
                    axios.get(`/api/board/detail/${list[i].id}`).then((res) => {
                      window.location.href = `/detail/${list[i].id}`;
                    });
                  }}
                >
                  <td class="board_list_title">{list[i].title}</td>
                  <td class="board_list_id">{list[i].id}</td>
                  <td class="board_list_skillStack">
                    스택 : {list[i].skillStack}
                  </td>
                  <td class="board_list_workField">
                    분야 : {list[i].workField}
                  </td>
                  <td class="board_list_maxPeople">
                    정원 : {list[i].maxPeople}
                  </td>
                  <td calss="board_list_createDate">
                    작성일 : {list[i].createDate.slice(0, 10)}
                  </td>
                  <td>마감일 : {list[i].postEndDate}</td>
                </tr>
              </>
            );
          })}
        </table>
        {/* 페이징 */}
        <Pagination
          className="pagination"
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={pageChangeHandler}
        />
      </div>
    </>
  );
}

export default BoardList;
