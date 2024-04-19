<script setup lang="ts">
import { ref, watch } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import GallowsFigure from "@/components/GallowsFigure.vue";
import GallowsWrongLetters from "@/components/GallowsWrongLetters.vue";
import GallowsWord from "@/components/GallowsWord.vue";
import GallowsPopup from "@/components/GallowsPopup.vue";
import GallowsNotification from "@/components/GallowsNotification.vue";
import { useRandomWords } from '@/composibles/useRandomWords'
import { useLetters } from '@/composibles/useLetters'
import { useNotification } from '@/composibles/useNotification'

const { word, getRandomWord } = useRandomWords();
const { letters, correctLetters, wrongLetters, isLose, isWin, addLetter, resetLetters } = useLetters(word);
const { notification, showNotification} = useNotification();

const popup = ref<InstanceType<typeof GallowsPopup> | null >(null)

watch(wrongLetters, () => {
  if(isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if(isWin.value) {
    popup.value?.open('win')
  }
})

const restart = async () => {
  await getRandomWord();
  resetLetters();
  popup.value?.close();
}

window.addEventListener('keydown', ({ key }) => {
  if(isLose.value || isWin.value) {
    return
  }
  if(letters.value.includes(key)) {
    showNotification();
    return
  }

  addLetter(key)
})
</script>

<template>
  <div>
    <TheHeader />

    <div class="game-container">
      <GallowsFigure :wrong-letters-count="wrongLetters.length" />

      <GallowsWrongLetters :wrong-letters="wrongLetters" />

      <GallowsWord :word="word" :correct-letters="correctLetters" />
    </div>

    <GallowsPopup ref="popup" :word="word" @restart="restart" />

    <GallowsNotification ref="notification" />
  </div>
</template>
