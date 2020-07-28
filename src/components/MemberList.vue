<template>
  <div>
    <Bottom></Bottom>

    <header>
      <h1>ARES UNITED</h1>
      <h3>MemberList</h3>
    </header>

    <section style="overflow: hidden;">
      <div class="wrap">
        <div class="wrapper">
        </div>
        <div class="tt">회원 목록</div>
        <div id='test-table' style="overflow: auto;">
          <table class="team_r">
            <tr>
              <th style="background-color: #3c7ca2; color: #fff; border-radius: 12px 0px 0px 0px;"> 회원명</th>
              <th style=" background-color: #3c7ca2; color: #fff; border-radius: 0px 12px 0px 0px;"> 연락처</th>
            </tr>
            <tr v-for="member in member_list">
              <td>{{ member.member_id }}</td>
              <td>{{ member.member_tel }}</td>
            </tr>
          </table>
        </div>


      </div>
    </section>

  </div>

</template>

<script>
  import Bottom from "./layout/Bottom";
  const axios = require('axios');

  export default {
    name: "memberList",
    components: {Bottom},
    data() {
      return {
        member_list: []
      }
    },
    created() {
      axios({
        method: 'GET',
        url: '/api/member/getMemberList'
      }).then((response) => {
        this.member_list = response.data.member_list;
        console.log(this.member_list)
      }).catch((error) => {
        alert("서버에 문제가 발생하였습니다.\n김수윤에게 고백해서 혼내주세요.")
        console.log("ERROR ==> ", error)
      })
    },

  }
</script>

<style scoped>

  @import "../assets/css/game_vote_list.css";
  @import "../assets/js/jquery.mobile-1.4.5/jquery.mobile-1.4.5.css";
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700,900&display=swap&subset=korean');

  #test-table {
    width: 100%;
    height: 230px;

  }

  #test-table table {
    table-layout: fixed;
    text-align: center;
    width: 100%;


  }

  .team_r {
    border: 1px solid rgba(0.1, 0, 0, 0.1);
    border-radius: 12px 0px 0px 0px / 12px 0px 0px 0px;
    border-spacing: 0px;

  }

  section {
    top: 250px;
    height: 50%;
  }

  #test-table table:nth-child(odd) {
    float: left;
  }

  #test-table table th {
    background: #eeeeee;
    font-size: 16px;
    height:40px;
    color: #444;
    padding: 0 0 0 0;
    font-family: 'Open Sans', 'Noto Sans KR', sans-serif;
    color: rgba(0.6, 0, 0, 0);
  }

  #test-table table td {
    padding: 0 0 0 0;
    border-bottom: 1px solid rgba(0.1, 0, 0, 0.1);
    height:40px;
  }


  #test-table:after {
    content: '';
    display: block;
    clear: left;
  }

</style>
