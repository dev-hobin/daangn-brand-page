import gsap from 'gsap'

export function fastForwardAnimation(
  timeline: gsap.core.Timeline,
  ratio: `${number}/${number}` = '0/1',
) {
  const [top, bottom] = ratio.split('/').map(Number)
  const totalDuration = timeline.totalDuration()
  const duration = (top * totalDuration) / (bottom - top)

  return gsap.timeline().to({}, { duration }).add(timeline)
}

export function delayAnimation(
  timeline: gsap.core.Timeline,
  ratio: `${number}/${number}` = '0/1',
) {
  const [top, bottom] = ratio.split('/').map(Number)
  const totalDuration = timeline.totalDuration()
  const duration = (top * totalDuration) / (bottom - top)

  return timeline.add(gsap.to({}, { duration }))
}
