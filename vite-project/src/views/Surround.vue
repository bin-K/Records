<template>
  <div>
    <div @mousemove="swiperleft"
         @mouseup="mouseup"
         @mousedown="mousedown">
      <div v-for="(item,i) in imglist"
           :key="i">
        <img draggable="false"
             :class="i===index?'show':'noshow'"
             :src="imglist[index]"
             alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/abbf9ddedff04ac3b70d12ea22226d20~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/6bd133b3c0df46e5b16fcca10bd39dd5~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/258f397621f749469996c4853e159191~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/4dd76bb51bb7485ca7376a1f408e9318~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/2f3149bcc69c482c8ad4b4918fe66a9d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/59d6dc080a0948d89464c38552e4041d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/51b02c1db4c3421aa1577a1734a40c0d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/fa0a1ff0759a47229848076ba17f047a~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/0bf7dfd895244a5095b47b2c45756ad1~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/9b2468068cf743a783d1e1777a522d34~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/49b71149397344ec8d5be1fb515ead86~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/f6c5275ed2674204bfc8f2bd03df8716~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/f6c5275ed2674204bfc8f2bd03df8716~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/d4c03f339bb547e6a2bdae6c6a465872~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/544bd4983cb74b619218a3b0c2f7ed85~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/1e789c686a3146a2a674a1b953538eb1~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/ab99442d5ac5458184635fca7ccf4ec3~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/073a1154b01148808224c1aac90f9dbb~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/ccfd02234a9e4404880399b80bb7da83~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/cec1476cfa13456fa2682b94e37a47fb~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/01b9cb2f60f04d6b9492f928226770cc~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/6573b31cafff4814a4137dd9afa0e221~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/79c55fea9f444e1b8dd54f39721e1117~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/64d6de15d1574d6283df0826d3d481c6~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/987968c95ee2422bb9a0cc31c45b406e~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/964ac687af654480994786e19a10f836~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/ceaa76b53dba4ab48ee0c24ed09b8624~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/27bdae01eedf4c3f948ef237207e468d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/13e763d532494c428209aa00c9dfd0ac~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/1a4f6bd68cd9458b960fb2ebd3978ee5~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/7c07bd6c01964672ae06b8d7fcf5fc87~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/a2fb2e67a6514b8d9e1471274c82185a~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/72646b43557944b0b0879bb171d891cc~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/bf35b93ec309441f86c999ac4f9e28a6~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/b6c3d41b17de44c3afc34bee0110d527~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/d1ea655d9eb7428c805594b56566906a~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/e3f840438c1245ad984907ac2b9f3458~1200x0.webp',
 */
import { ref, watch } from 'vue'
const index = ref(0)
const newindex = ref(0)
const trunc = ref(0)
const newx = ref(0)
const newx2 = ref(0)
const zd = ref(false)
const imglist = ref([
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/abbf9ddedff04ac3b70d12ea22226d20~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/6bd133b3c0df46e5b16fcca10bd39dd5~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/258f397621f749469996c4853e159191~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/4dd76bb51bb7485ca7376a1f408e9318~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/2f3149bcc69c482c8ad4b4918fe66a9d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/59d6dc080a0948d89464c38552e4041d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/51b02c1db4c3421aa1577a1734a40c0d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/fa0a1ff0759a47229848076ba17f047a~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/0bf7dfd895244a5095b47b2c45756ad1~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/9b2468068cf743a783d1e1777a522d34~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/49b71149397344ec8d5be1fb515ead86~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/f6c5275ed2674204bfc8f2bd03df8716~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/f6c5275ed2674204bfc8f2bd03df8716~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/d4c03f339bb547e6a2bdae6c6a465872~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/544bd4983cb74b619218a3b0c2f7ed85~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/1e789c686a3146a2a674a1b953538eb1~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/ab99442d5ac5458184635fca7ccf4ec3~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/073a1154b01148808224c1aac90f9dbb~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/ccfd02234a9e4404880399b80bb7da83~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/cec1476cfa13456fa2682b94e37a47fb~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/01b9cb2f60f04d6b9492f928226770cc~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/6573b31cafff4814a4137dd9afa0e221~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/79c55fea9f444e1b8dd54f39721e1117~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/64d6de15d1574d6283df0826d3d481c6~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/987968c95ee2422bb9a0cc31c45b406e~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/964ac687af654480994786e19a10f836~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/ceaa76b53dba4ab48ee0c24ed09b8624~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/27bdae01eedf4c3f948ef237207e468d~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/13e763d532494c428209aa00c9dfd0ac~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/1a4f6bd68cd9458b960fb2ebd3978ee5~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/7c07bd6c01964672ae06b8d7fcf5fc87~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/a2fb2e67a6514b8d9e1471274c82185a~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/72646b43557944b0b0879bb171d891cc~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/bf35b93ec309441f86c999ac4f9e28a6~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/b6c3d41b17de44c3afc34bee0110d527~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/d1ea655d9eb7428c805594b56566906a~1200x0.webp',
  'https://p3.dcarimg.com/img/tos-cn-i-0000c0030/e3f840438c1245ad984907ac2b9f3458~1200x0.webp',
  ])

const mousedown = (e: any) => {
  //按上开始滑动
  zd.value = true
  //存储在x轴哪里开始点击的
  newx.value = e.x
  //存储在点击的时候的图片是哪张
  newindex.value = index.value
}

const mouseup = () => {
  zd.value = false
}

const swiperleft = (e: any) => {
   //计算是往左滑动还是右面滑动
  newx2.value = newx.value - e.x
  //每30px滑动一张  在这里调节帧率 越小越流畅
  trunc.value = Math.trunc(newx2.value / 30) + 1
}

const updateValue = () => {
  if (zd.value) {
    //当index大于数组长度了重置到第一张
    if (index.value > imglist.value.length - 1) {
      index.value = 0
    } else {
      //判断是往左还是往右
      if (trunc.value > 0) {
        //往右
        index.value = newindex.value - trunc.value % imglist.value.length
        //滑动到index第一个了
        if (index.value < 1) {
          index.value = imglist.value.length - 1
          newindex.value = imglist.value.length - 1
        }
      } else {
        index.value = newindex.value - trunc.value % imglist.value.length
        //滑动到index最后一个了
        if (index.value > imglist.value.length - 1) {
          index.value = 0
          newindex.value = 0
        }
      }
    }
  }
}

watch(
  () => trunc.value,
  () => {
    updateValue()
  }
)

</script>
<style scoped>
.show{
  opacity: 1;
  position: absolute;
}
.noshow{
  opacity: 0;
  position: absolute;
}
</style>
