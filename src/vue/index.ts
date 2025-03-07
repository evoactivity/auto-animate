import { ref, onMounted, watchEffect, Plugin, Ref } from "vue"
import autoAnimate, {
  vAutoAnimate,
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"

export const autoAnimatePlugin: Plugin = {
  install(app) {
    app.directive("auto-animate", vAutoAnimate)
  },
}

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @param options - Auto animate options or a plugin
 * @returns A template ref. Use the `ref` attribute of your parent element
 * to store the element in this template ref.
 */
export function useAutoAnimate<T extends Element>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): [Ref<T>, (enabled: boolean) => void] {
  const element = ref<T>()
  let controller: AnimationController | undefined
  function setEnabled(enabled: boolean) {
    if (controller) {
      enabled ? controller.enable() : controller.disable()
    }
  }
  onMounted(() => {
    watchEffect(() => {
      if (element.value instanceof HTMLElement)
        controller = autoAnimate(element.value, options)
    })
  })

  return [element as Ref<T>, setEnabled]
}
