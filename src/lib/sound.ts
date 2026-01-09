class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  isEnabled(): boolean {
    return this.enabled
  }

  playCompletionSound() {
    if (!this.enabled) return

    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      const oscillator1 = ctx.createOscillator()
      const oscillator2 = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator1.connect(gainNode)
      oscillator2.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator1.frequency.setValueAtTime(800, now)
      oscillator1.frequency.exponentialRampToValueAtTime(1200, now + 0.1)
      
      oscillator2.frequency.setValueAtTime(1000, now)
      oscillator2.frequency.exponentialRampToValueAtTime(1400, now + 0.1)

      gainNode.gain.setValueAtTime(0.15, now)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2)

      oscillator1.type = 'sine'
      oscillator2.type = 'sine'

      oscillator1.start(now)
      oscillator2.start(now)
      oscillator1.stop(now + 0.2)
      oscillator2.stop(now + 0.2)
    } catch (error) {
      console.warn('Sound playback failed:', error)
    }
  }

  playProgressTick() {
    if (!this.enabled) return

    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(600, now)
      
      gainNode.gain.setValueAtTime(0.05, now)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05)

      oscillator.type = 'sine'

      oscillator.start(now)
      oscillator.stop(now + 0.05)
    } catch (error) {
      console.warn('Sound playback failed:', error)
    }
  }

  playSuccessTone() {
    if (!this.enabled) return

    try {
      const ctx = this.getAudioContext()
      const now = ctx.currentTime

      const notes = [
        { freq: 523.25, time: 0 },
        { freq: 659.25, time: 0.1 },
        { freq: 783.99, time: 0.2 },
      ]

      notes.forEach(({ freq, time }) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.frequency.setValueAtTime(freq, now + time)
        
        gainNode.gain.setValueAtTime(0.1, now + time)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + time + 0.15)

        oscillator.type = 'sine'

        oscillator.start(now + time)
        oscillator.stop(now + time + 0.15)
      })
    } catch (error) {
      console.warn('Sound playback failed:', error)
    }
  }
}

export const soundManager = new SoundManager()

export function triggerHapticFeedback(type: 'light' | 'medium' | 'heavy' = 'medium') {
  if ('vibrate' in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 30,
    }
    
    try {
      navigator.vibrate(patterns[type])
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
    }
  }
}

export function triggerSuccessHaptic() {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([10, 50, 10, 50, 20])
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
    }
  }
}
