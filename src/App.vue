<template>
  <div id="app-wall">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// FONTS
@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,700|Source+Code+Pro');
$primary-font: 'Noto Sans', sans-serif;
$code-font: 'Source Code Pro', monospace;
$code-color: rgb(0, 204, 204);

// COLORS
$white: #fff;
$light-gray: lightgray;
$black: #000;
$red: rgba(#c00, .6);
$orange: rgba(#f90, .5);
$green: rgba(#0c0, .5);

// SETTINGS
$foot-height: 20px;

// GENERAL

*, *::before, *::after{
  box-sizing: border-box;
}
body{
  font-family: $primary-font;
  font-size: 16px;
  margin: 0;
}
h1,h2,h3,h4,h5,h6{
  margin-top: 0;
}

// EDITOR STYLES
.container {
  display: flex
}
.folder {
  margin: 0 0 0 auto;
  font-size: 70%;
  height: 400px;
  min-width: 214px;
}
.files-list {
  max-height: 70vh;
  overflow: auto;
  font-size: 90%;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.9);
  .file {
    .file-new{
      margin: 0 auto;
      i {
        color: $green
      }
    }
    &.active {
      outline: 1px solid $green
    }
    cursor: pointer;
    padding: 10px;
    display: flex;
    color: rgba($black, .4);
    .file-detail {
      display: block;
      margin: 0 4px;
      .title, .value{
        display: inline-block;
      }
      .value {
        color: $black;
      }
    }
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba($black, 0.3);
    border-radius: 10px;
    background-color: $white;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: $white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba($black, 0.3);
    background-color: lightgray;
  }
}
    .fa{
      &.error {
        color: rgba($red, .6);
        &:hover{
          color: rgba($red , .5);
        }
      }
      &.success {
        color: rgba($green, .6);
        &:hover{
          color: rgba($green , .5);
        }
      }
    }
#app-wall{
  min-height: 100vh;
  padding: 5rem 0;
  transition: background .4s;
  background-color:rgba(0, 204, 204, .15);
}
#app{
  width: 40rem;
  max-width: 100%;
  height: 400px;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 70%;
  transition: all .4s;
}

header{
  position: relative;
  height: $foot-height;
  line-height: $foot-height;
  text-align: center;
  font-size: .75em;
  color: rgba($black, .8);
  background: $light-gray;
  border-radius: 5px 5px 0 0;
  .buttons{
    position: absolute;
    top: 6px;
    left: 22px;
    width: 8px;
    height: 8px;
    background: $orange;
    border-radius: 50%;
    box-shadow: -12px 0 0 $red,
                12px 0 0 $green;
  }
}

.editor{
  position: relative;
  min-height: 100%;
  background: rgba($black, .2);
  display: flex;
  overflow: hidden;
  .code,
  .result,
  .settings{
    width: 50%;
    padding: 1rem;
  }
  .code{
    resize: none;
    border: none;
    font-size: 100%;
    font-family: $code-font;
    color: $code-color;
    background: rgba($black, .8);
    outline: none;
    transition: color .4s;
  }
  .result{
    background: $white;
    hr{
      border: none;
      border-bottom: 1px solid rgba($black, .2);
    }
    img{
      max-width: 100%;
      height: auto;
    }
    ul, ol{
      margin-left: 0;
      padding-left: 20px;
      li{
        margin-left: 0;
      }
    }
  }
  .alert{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba($white, .85);
      transform: translateY(-100%);
      transition: transform .4s;
      &.open{
        transform: translateY(0);
      }
      .text{
        border-radius: .4rem;
        padding: 1rem 1rem 1.1rem;
        text-align: center;
        background: $white;
        color: rgba($black, .5);
        line-height: 1.4;
        .options {
          & > i {
            cursor: pointer;
          }
          display: inline-block;
        }
      }
    }
  .settings{
    position: absolute;
    top: 0;
    right: 0;
    width: 51%;
    height: 100%;
    color: $white;
    background: #000;
    transform: translateX(101%);
    transition: transform .4s;
    &.active{
      transform: translateX(0);
    }
    h2{
      position: relative;
      .fa{
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        transition: transform .3s;
        font-size: .85em;
        cursor: pointer;
        &:hover{
          transform: translateY(-50%) rotate(-180deg);
        }
      }
    }
    h3{
      margin-top: 2rem;
      padding: .25rem .2rem .2rem;
      font-weight: normal;
      background: rgba($white, .2);
    }
  }
}

footer{
  position: relative;
  height: $foot-height;
  line-height: $foot-height;
  text-align: center;
  text-transform: uppercase;
  font-size: .75em;
  font-weight: bold;
  color: rgba($black, .4);
  border-radius: 0 0 5px 5px;
  box-shadow: 0 12px 15px -8px rgba($black, .9);
  transition: background .4s;
  padding: 0 7px;
  a {
    text-decoration: none;
    color: rgba($black, .4);
  }
  .options {
    float: right;
    .fa{
      position: relative;
      padding: 4px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 50%;
      transition: color .4s;
      &:hover{
        color: rgba($black, .8);
      }
      &.lookme{
        animation: blink 1s linear infinite alternate;
      }
    }
  }
}

// ANIMATIONS
@keyframes blink{
  from{
    color: rgba($black, .4);
    box-shadow: 0 0 10px 7px rgba(yellow, .2);
  }
  to{
    color: rgba($black, .8);
    box-shadow: 0 0 10px 7px rgba(yellow, .8);
  }
}
@keyframes rotation{
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
}
@keyframes pulse{
  from{
    transform: scale(0);
  }
  to{
    transform: scale(1.1);
  }
}
</style>
