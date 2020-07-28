<template>
  <div>
    <Bottom></Bottom>

    <header>
      <h1>ARES UNITED</h1>
      <h3>Attendance</h3>
    </header>

    <section style="overflow: hidden;">
      <div class="wrap">
        <div class="wrapper">
          <div class="item classification">
            <p>총원</p>
          </div>
          <div class="item classification" @click="goVoteList">
            <p>참석</p>
          </div>
          <div class="item classification" @click="goNoVoteList">
            <p>불참</p>
          </div>
          <div class="item classification" @click="goNotVoteList">
            <p>미투표</p>
          </div>

          <div class="item personnel" @click="">{{ game_vote_cnt.member_cnt }}</div>
          <div class="item personnel" @click="goVoteList">{{ game_vote_cnt.vate_cnt }}</div>
          <div class="item personnel" @click="goNoVoteList">{{ game_vote_cnt.no_vate_cnt }}</div>
          <div class="item personnel" @click="goNotVoteList">{{ game_vote_cnt.not_vote_cnt }}</div>
        </div>

        <div class="tt">불참 목록</div>

        <div id='test-table' style="overflow: auto;">
          <table class="team_r">
            <tr><th style="width:100%;">불참( {{ game_vote_cnt.no_vate_cnt }} 명 )</th></tr>
            <tr v-for="game_vote in game_vote_list">
              <td style="width:100%;" v-if="game_vote.vate === '불참'">{{ game_vote.member_id }}</td>
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
    name: "noVoteList",
    components: {Bottom},
    data() {
      return {
        game_vote_list: [],
        game_vote_cnt: [],
        play_index: this.$route.params.play_index
      }
    },
    created() {
      axios({
        method: 'GET',
        url: '/api/schedule/getVoteGameList',
        params : {
          play_index: this.play_index
        }
      }).then((response) => {
         this.game_vote_cnt = response.data.game_vote_cnt,
         this.game_vote_list = response.data.game_vote_list

        console.log("game_vote_count :" + this.game_vote_cnt)
        console.log("game_vote_list:" + this.game_vote_list)
      }).catch((error) => {
        alert("서버에 문제가 발생하였습니다.\n김수윤에게 고백해서 혼내주세요.")
        console.log("ERROR ==> ", error)
      })
    },
    methods: {
      goVoteList() {
        this.$router.push({name: 'VoteList', params: {"play_index": this.play_index}});
      },
      goNoVoteList() {
        this.$router.push({name: 'NoVoteList', params: {"play_index": this.play_index}});
      },
      goNotVoteList() {
        this.$router.push({name: 'NotVoteList', params: {"play_index": this.play_index}});
      }
    }

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
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px 0px 0px 0px / 12px 0px 0px 0px;
    border-spacing: 0px;

  }

  .team_s {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 0px;
    border-radius: 0px 12px 0px 0px / 0px 12px 0px 0px;
    border-spacing: 0px;
  }

  .team_c {
    border: 1px solid rgba(0, 0, 0, 0);
    border-left: 0px;
    border-radius: 0px 12px 0px 0px / 0px 12px 0px 0px;
    border-spacing: 0px;
  }

  #test-table table:nth-child(odd) {
    float: left;
  }

  #test-table table th {
    height: 30px;
    background: #eeeeee;
    font-size: 16px;
    height:40px;
    color: #444;
    padding: 0 0 0 0;
    font-family: 'Open Sans', 'Noto Sans KR', sans-serif;
    color: rgba(0, 0, 0, 0.6);
  }

  #test-table table td {
    padding: 0 0 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    height:40px;

  }


  #test-table:after {
    content: '';
    display: block;
    clear: left;
  }

</style>
