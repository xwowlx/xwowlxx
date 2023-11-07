
<!-- sign_in -->
<template>
    <div class="switch" id="switch-cnt">
            <div class="switch__circle"></div>
            <div class="switch__circle switch__circle--t"></div>
            <div class="switch__container" id="switch-c1">
              <h2 class="switch__title title">Welcome Back</h2>
              <p class="switch__description description">To keep connected with us please login with your personal info</p>
              <button class="form__button button submit" @click="change">登录</button>
            </div>
            <!-- <div class="switch__container is-hidden" id="switch-c2">
              <h2 class="switch__title title">Hello Friend </h2>
              <p class="switch__description description">Enter your personal details and start journey with us</p>
              <button class="switch__button button switch-btn" @click="change">注册</button>
            </div> -->
          </div>
          <div class="container b-container" id="b-container">
            <form class="form" id="b-form" method="" action="">
              <h2 class="form_title title">Sign in to Website</h2>
              <div class="form__icons">
                <img class="form__icon" src=" ">
                <img class="form__icon" src=" ">
                <img class="form__icon" src=" ">
              </div>
              <span class="form__span">or use your email account</span>
              <input class="form__input" type="text" placeholder="用户名" >
              <input class="form__input" type="password" placeholder="密码" >
            </form>
          </div>
</template>
<script setup lang="ts">
import router from '../../../router';

        const change = () => {
            const switchCircle = document.querySelectorAll(".switch__circle") as any;
            switchCircle[0].classList.toggle("is-txr");
            switchCircle[1].classList.toggle("is-txr");
            setTimeout(() => {
              router.push('/home')
            }, 1000);
        }
    </script>
     
    <style scoped>
    @import './login.css';
    </style>

