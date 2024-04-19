import { ref } from 'vue'
import GallowsNotification from '@/components/GallowsNotification.vue'


export const useNotification = () => {
  const notification = ref<InstanceType<typeof GallowsNotification> | null>(null);

  const showNotification = (message: string) => {
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)

  }

  return {
    notification,
    showNotification
  }
}
