import gsap from 'gsap'

// https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
export function horizontalLoop(
  items: HTMLElement[],
  config: {
    repeat?: number
    paused?: boolean
    speed?: number
    snap?: boolean | number
    paddingRight?: number
  } = {},
) {
  items = gsap.utils.toArray(items)
  config = config || {}
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
  })
  const length = items.length
  const startX = items[0].offsetLeft
  const times: number[] = []
  const widths: number[] = []
  const xPercents: number[] = []
  const pixelsPerSecond = (config.speed || 1) * 100,
    snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap((config.snap as number) || 1) // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural

  let curX: number, distanceToStart: number, distanceToLoop: number, item, i

  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        String(gsap.getProperty(el, 'width', 'px')),
      ))

      xPercents[i] = snap(
        (parseFloat(String(gsap.getProperty(el, 'x', 'px'))) / w) * 100 +
          parseFloat(String(gsap.getProperty(el, 'xPercent'))),
      )
      return xPercents[i]
    },
  })
  gsap.set(items, { x: 0 })

  const totalWidth: number =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      Number(gsap.getProperty(items[length - 1], 'scaleX')) +
    (config.paddingRight || 0)

  for (i = 0; i < length; i++) {
    item = items[i]
    curX = (xPercents[i] / 100) * widths[i]
    distanceToStart = item.offsetLeft + curX - startX
    distanceToLoop =
      distanceToStart + widths[i] * Number(gsap.getProperty(item, 'scaleX'))
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add('label' + i, distanceToStart / pixelsPerSecond)
    times[i] = distanceToStart / pixelsPerSecond
  }
  tl.times = times
  tl.progress(1, true).progress(0, true) // pre-render for performance
  return tl
}
