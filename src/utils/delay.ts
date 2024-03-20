import gsap from 'gsap'

export function delayAnimationEnd(
  timeline: gsap.core.Timeline,
  ratio: `${number}/${number}` = '0/1',
) {
  const [top, bottom] = ratio.split('/').map(Number)
  const totalDuration = timeline.totalDuration()
  const delayDuration = (top * totalDuration) / (bottom - top)

  return gsap.timeline().to({}, { duration: delayDuration }).add(timeline)
}

export function delayAnimationStart(
  timeline: gsap.core.Timeline,
  ratio: `${number}/${number}` = '0/1',
) {
  const [top, bottom] = ratio.split('/').map(Number)
  const totalDuration = timeline.totalDuration()
  const delayDuration = (top * totalDuration) / (bottom - top)

  return timeline.add(gsap.to({}, { duration: delayDuration }))
}
