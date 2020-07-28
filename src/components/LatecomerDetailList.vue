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
        <h3>Perceive List</h3>
      </div>
    </header>

    <section style="overflow: hidden;">
      <div class="wrap">
        <div class="wrapper">
        </div>
        <div id='test-table' style="overflow: auto;">
          <table class="team_r">
            <tr>
              <th style=" width:50%; background-color: #3c7ca2; color: #fff; border-radius: 12px 0px 0px 0px;"> 회원명</th>
              <th style=" width:50%;background-color: #3c7ca2; color: #fff; border-radius: 0px 12px 0px 0px;"> 지각 / 불참
              </th>
            </tr>
            <tr v-for="latecomer_detail in latecomer_detail_list">
              <td>{{ latecomer_detail.member_id }}</td>
              <td v-if="latecomer_detail.late != null ">{{ latecomer_detail.late }}</td>
              <td v-else="latecomer_detail.noshow != null ">{{ latecomer_detail.noshow }}</td>
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
    name: "LatecomerDetailList",
    components: {Bottom},
    data() {
      return {
        latecomer_detail_list: [],
        play_time: this.$route.params.play_time
      }
    },
    created() {
      axios({
        method: 'GET',
        url: '/api/schedule/getPerceiveDetailList',
        params: {
          "play_time": this.play_time
        }
      }).then((response) => {
        this.latecomer_detail_list = response.data.latecomer_detail_list;
        console.log(this.latecomer_detail_list)
      }).catch((error) => {
        alert("서버에 문제가 발생하였습니다.\n김수윤에게 고백해서 혼내주세요.")
        console.log("ERROR ==> ", error)
      })
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
    height: 350px;

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
    top: 150px;
    height: 45%;
  }

  #test-table table:nth-child(odd) {
    float: left;
  }

  #test-table table th {
    background: #eeeeee;
    font-size: 16px;
    height: 40px;
    color: #444;
    padding: 0 0 0 0;
    font-family: 'Open Sans', 'Noto Sans KR', sans-serif;
    color: rgba(0.6, 0, 0, 0);
  }

  #test-table table td {
    padding: 0 0 0 0;
    border-bottom: 1px solid rgba(0.1, 0, 0, 0.1);
    height: 50px;
  }


  #test-table:after {
    content: '';
    display: block;
    clear: left;
  }

</style>
