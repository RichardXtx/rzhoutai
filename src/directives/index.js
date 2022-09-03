import store from '@/store'

export const imerror = {
  inserted(el, binding) {
    el.onerror = function() {
      el.src = binding.value
    }
  }
}

export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}

export const permission = {
  inserted(el, binding) {
    const roles = store.getters.roles
    if (!roles?.points?.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
}

