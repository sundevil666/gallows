<script setup lang="ts">
import { ref } from "vue";
import type { GameStatus } from '@/type/GameStatus'

interface Props {
  word: string
}
defineProps<Props>()

const gemStatus = ref<GameStatus | null>(null)

const isVisible = ref(false)
const open = (status: GameStatus) => {
  isVisible.value = true
  gemStatus.value = status
}
const close = () => isVisible.value = false

defineExpose({
  open,
  close
})

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gemStatus === 'win'">Поздравляю, вы победили! 😃</h2>
       <template v-if="gemStatus === 'lose'">
         <h2>Вы проиграли. 😕</h2>
         <h3>...имя: "{{ word }}"</h3>
       </template>
      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>
