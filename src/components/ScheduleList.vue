<template>
  <div>

    <Bottom></Bottom>
    <header>
      <div style="float:right">
        <div id="addIcon">
          <div @click=''>+</div>
        </div>
      </div>
      <div>
        <h1>ARES UNITED</h1>
        <h3>Match Schedule</h3>
      </div>
    </header>

    <section>

      <div class="grid-container" v-for="schedule in schedule_list">
        <div v-if='moment().format("YYYY-MM-DD HH:mm:ss") <= schedule.play_time'>
          <div @click="goVoteList(schedule.play_index)">
            <div class="date">
              <p>{{moment(schedule.play_time).format('HH:mm')}}</p>
              <p>{{moment(schedule.play_time).format('YYYY.MM.DD')}}</p>
            </div>
            <div class="place">{{schedule.play_location}}</div>
            <div class="grid-container2">
              <div id="teamR">
                <div>{{schedule.play_team1}}</div>
              </div>
              <div id="vs">vs</div>
              <div id="teamS">
                <div>{{schedule.play_team2}}</div>
              </div>
            </div>
          </div>

          <div class="grid-container3">
            <button type="button" name="button" @click="playIn('1', schedule.play_index)">참석</button>
            <button type="button" name="button" @click="playIn('2', schedule.play_index)">불참</button>
          </div>
        </div>

        <div v-else>
          <div class="box_match_last grid-container" @click="goVoteList(schedule.play_index)">
            <div class="grid-item date">
              <p>{{moment(schedule.play_time).format('HH:mm')}}</p>
              <p>{{moment(schedule.play_time).format('YYYY.MM.DD')}}</p>
            </div>
            <div class="grid-item place">{{schedule.play_location}}</div>
            <div class="grid-item vs">{{schedule.play_team1}} vs {{schedule.play_team2}}</div>
            <div class="baddge">{{schedule.play_winner}}</div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
  import Bottom from "./layout/Bottom";

  const axios = require('axios');
  const moment = require('moment');

  export default {
    name: "Schedule_List",
    data() {
      return {
        schedule_list: []
      }
    },
    components: {Bottom},
    beforeCreate() {
      if(this.$store.state.member_id == null) {
        alert("로그인 정보가 없습니다. 로그인 후 시도 후 주세요.")
        //개발 일 경우 session 정보 확인 관련하여 잠시 삭제.
        //추후 배포 시 주석 삭제 필
        //this.$router.push("/")
      }
    },
    created() {
      axios({
        method: 'GET',
        url: '/api/schedule/getScheduleList'
      }).then((response) => {
        this.schedule_list = response.data.schedule_list;
        console.log(this.schedule_list)
      }).catch((error) => {
        alert("서버에 문제가 발생하였습니다.\n김수윤에게 고백해서 혼내주세요.")
        console.log("ERROR ==> ", error)
      })
    },
    methods: {
      playIn(inYn, play_index) {
        axios({
          method: 'PUT',
          url: '/api/schedule/putVote',
          params: {
            in_yn: inYn,
            play_index: play_index,
            member_id: this.$store.state.member_id,
            member_pwd: this.$store.state.member_pwd
          }
        }).then((response) => {
          if (response.data.result === true) {
            alert("참석/불참 처리가 완료되었습니다.");
          } else if (response.data.result === false) {
            alert("참석/불참 처리에 실패 하였습니다.\n 다시 시도 해주세요.")
          }
        }).catch((error) => {
          alert("서버에 문제가 발생하였습니다.\n김수윤에게 고백해서 혼내주세요.")
          console.log("ERROR ==> ", error)
        })
      },
      goVoteList(play_index) {
        this.$router.push({name: 'VoteList', params: {"play_index": play_index}});
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/attendance_list.css";
  @import "../assets/js/jquery.mobile-1.4.5/jquery.mobile-1.4.5.css";
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700,900&display=swap&subset=korean');

  body, header, h1, h2, h3, h4, p, section, div {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', 'Noto Sans KR', sans-serif;
  }

  body {
    text-align: center;
  }

  header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 240px;
    background: -webkit-linear-gradient(left, #3b6a71, #1d2f62);
    background: linear-gradient(to right, #3b6a71, #1d2f62);
    color: #fff;
    text-align: center;
    z-index: -999;
  }

  h1 {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    font-weight: 700;
    text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  }

  h3 {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
  }

  section {
    position: absolute;
    top: 160px;
    left: 0;
    right: 0;
    width: 90%;
    height: 65%;
    margin: 0 auto;
    overflow-y: scroll;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .grid-container {
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-row-gap: 5px;
    background-color: white;
    box-sizing: border-box;
    border-radius: 12px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 25px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .date {
    margin-top: 20px;
  }

  .date p:nth-child(1) {
    font-size: 80px;
    font-weight: 700;
  }

  .date p:nth-child(2) {
    font-size: 22px;
    font-weight: 700;
  }

  .place {
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.6);
  }

  .grid-container2 {
    display: grid;
    grid-template-columns: auto 20px auto;
    box-sizing: border-box;
    height: 80px;
    padding: 0;
  }

  .grid-container2 div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  #teamR div, #teamS div {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    margin: 0 auto;
    font-size: 30px;
  }

  #addIcon div {
    display: inline-block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    margin: 0 auto;
    font-size: 30px;
    margin-top: 20px;
    text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    background-color: #992853;
    margin-right: 20px;
    vertical-align: middle;
  }

  #vs {
    font-weight: 700;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.5);
  }

  #teamR div {
    background-color: #3c7ca2;
  }

  #teamS div {
    background-color: #992853;
  }

  .grid-container3 {
    display: grid;
    grid-template-columns: auto auto;
    box-sizing: border-box;
    /* border-radius: 0px 0px 12px 12px / 0px 0px 12px 12px; */
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    height: 80px;
    margin-top: 20px;
  }

  button {
    background-color: white;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);
  }

  button:nth-child(1) {
    border-radius: 0px 0px 0px 12px/0px 0px 0px 12px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  button:nth-child(2) {
    border-radius: 0px 0px 12px 0px/0px 0px 12px 0px;
  }

  .white {
    background-color: white;
  }

  .baddge {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    height: 60px;
    background-color: #3c7ca2;
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    border-radius: 0px 0px 12px 12px/0px 0px 12px 12px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* menu */
  #menu a {
    text-decoration: none;
    color: gray;
  }

  #menu {
    position: fixed;
    background-color: #fff;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  #menu ul {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }

  #menu ul li {
    padding-top: 15px;
    height: 100px;
    cursor: pointer;
  }

  #menu ul .selected {
    color: #000;
  }

  @font-face {
    font-family: 'fontello';
    src: url('../assets/font/fontello.eot?7449304');
    src: url('../assets/font/fontello.eot?7449304#iefix') format('embedded-opentype'), url('../assets/font/fontello.woff?7449304') format('woff'), url('../assets/font/fontello.ttf?7449304') format('truetype'),
    url('../assets/font/fontello.svg?7449304#fontello') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  .demo-icon {
    font-family: "fontello";
    font-style: normal;
    font-weight: normal;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    text-align: center;
    font-size: 20px;
    /* opacity: .8; */
    /* For safety - reset parent styles, that can break glyph codes*/
    font-variant: normal;
    text-transform: none;
    /* fix buttons height, for twitter bootstrap */
    line-height: 1em;
    /* Animation center compensation - margins should be symmetric */
    /* remove if not needed */
    margin-left: .2em;
    /* You can be more comfortable with increased icons size */
    /* font-size: 120%; */
    /* Font smoothing. That was taken from TWBS */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Uncomment for 3D effect */
    /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
  }

  .login-form {
    min-height: 345px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    width: 50%;
  }

  .login-form .group {
    margin-bottom: 15px;
  }

  .login-form .group .label {
    display: none;
  }

  .login-form .group .input, .login-form .group .button {
    width: 100%;
    color: #fff;
    font-size: 14px;
    display: block;
  }

  .login-form .group .button {
    font-size: 18px;
  }

  .login-form .group .input, .login-form .group .button {
    border: none;
    padding: 15px 20px;
    border-radius: 25px;
    background: rgba(247, 246, 246, .1);
  }

  .login-form .group input[data-type="password"] {
    text-security: circle;
    -webkit-text-security: circle;
  }

  .login-form .group .label {
    color: rgba(255, 255, 255, .5);
  }

  .login-form .group .button {
    background: #007d68;
  }

  .login-form .group #check_font {
    font-size: 14px;
    font-weight: 200;
  }

  .login-form .group label .icon {
    vertical-align: sub;
    width: 15px;
    height: 15px;
    border-radius: 2px;
    margin-right: 4px;
    position: relative;
    display: inline-block;
    background: rgba(255, 255, 255, .1);
  }

  .login-form .group label .icon:before, .login-form .group label .icon:after {
    content: '';
    width: 10px;
    height: 2px;
    background: #fff;
    position: absolute;
    transition: all .2s ease-in-out 0s;
  }

  .login-form .group label .icon:before {
    left: 3px;
    width: 5px;
    bottom: 6px;
    transform: scale(0) rotate(0);
  }

  .login-form .group label .icon:after {
    top: 6px;
    right: 0;
    transform: scale(0) rotate(0);
  }

  .login-form .group .check:checked + label {
    color: #fff;
  }

  .login-form .group .check:checked + label .icon {
    background: #007d68;
  }

  .login-form .group .check:checked + label .icon:before {
    transform: scale(1) rotate(45deg);
  }

  .login-form .group .check:checked + label .icon:after {
    transform: scale(1) rotate(-45deg);
  }

  .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm {
    transform: rotate(0);
  }

  .login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
    transform: rotate(0);
  }
</style>
