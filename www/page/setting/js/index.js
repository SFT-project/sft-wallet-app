
const showPop = () => {
  $('.helpPop')[0].style.cssText = 'bottom: 0rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const hidePop = () => {
  $('.helpPop')[0].style.cssText = 'bottom: -32rem;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
  $('.aboutPop')[0].style.cssText = 'bottom: -32rem; '

}
const showAboutPop = () => {
  $('.aboutPop')[0].style.cssText = 'bottom: 0rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}

const back=()=>{
  window.history.go(-1)
}