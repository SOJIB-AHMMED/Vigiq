import { useKV } from '@github/spark/hooks'
import { useEffect } from 'react'
import { soundManager } from '@/lib/sound'

export function useSoundSettings() {
  const [soundEnabled, setSoundEnabled] = useKV<boolean>('sound-enabled', true)
  
  useEffect(() => {
    soundManager.setEnabled(soundEnabled ?? true)
  }, [soundEnabled])
  
  return {
    soundEnabled: soundEnabled ?? true,
    setSoundEnabled,
    toggleSound: () => setSoundEnabled((prev) => !prev)
  }
}
