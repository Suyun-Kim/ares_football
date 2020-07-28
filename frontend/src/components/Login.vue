<template>
  <div>
  <div class="login-wrap">
    <div class="login-html">

      <header>
        <img src="../assets/images/spartan.jpg" alt="">
        <h1>ARES</h1>
      </header>

        <div class="login-form">
          <div class="sign-in-htm">
            <div class="group">
               <input type="text" class="input" v-model="signUpId" placeholder="회원 이름">
            </div>
            <div class="group">
                <input type="password" class="input" v-model="signUpPw" placeholder="전화번호 뒷 4자리">
            </div>
            <div class="group">
              <input id="check" type="checkbox" class="check" checked>
              <label for="check" id="check_font"><span class="icon"></span>아이디 기억하기</label>
            </div>
            <div class="group">
              <input type="button" class="button" value="로그인" @click="memberCheck">
            </div>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
  const axios = require('axios');

  export default {
    name: "Login",
    data: () => ({
      signUpId: null,
      signUpPw: null
    }),
    methods: {
        memberCheck() {
          axios({
            method: 'POST',
            url: '/api/login',
            params: {
              member_id: this.signUpId,
              member_pwd: this.signUpPw
            }
          }).then((response) => {
            if (response.data.result === false) {
              alert("아이디 / 비밀번호가 일치 하지 않습니다.")
            } else {
              this.$store.state.member_id = response.data.member_info.member_id
              this.$store.state.member_pwd = response.data.member_info.member_pwd
              this.$router.push('/schedule')
            }

          }).catch((error) => {
            alert("서버에 문제가 발생하였습니다.\n김수윤에게 고백해서 혼내주세요.")
            console.log("ERROR ==> ", error)
          })
        }


    }
  }
</script>

<style scoped>
   @import  "../assets/css/login.css";
</style>
