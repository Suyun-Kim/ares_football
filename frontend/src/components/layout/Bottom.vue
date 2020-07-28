<template>
    <nav id="menu">
      <ul>
        <li id="attendance_list">
          <a @click=goScheduleList><i class="demo-icon icon-table">&#xf0ce;</i></a></li>
        <li id="latecomer_list">
          <a @click=goLatecomerList><i class="demo-icon icon-table">&#xe804;</i></a>
        </li>
        <li>
          <a><i class="demo-icon icon-table">&#xe800;</i></a>
        </li>
        <li id="member_list">
          <a @click="goMemberList"><i class="demo-icon icon-table">&#xe801;</i></a>
        </li>
      </ul>
    </nav>
</template>

<script>
  export default {
    name: "Bottom",
    methods: {
      goScheduleList() {
        this.$router.push('/schedule')
      },
      goGameVoteList() {
        this.$router.push('/voteList')
      },
      goMemberList() {
        this.$router.push('/memberList')
      },
      goLatecomerList() {
        this.$router.push('/latecomerList')
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/attendance_list.css";
  @import "../../assets/css/menu.css";
</style>
