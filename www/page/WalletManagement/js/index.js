
const showDelPop = () => {
  $('.delWalletPop')[0].style.cssText = 'top: 50%; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const hidePop = () => {
  $('.delWalletPop')[0].style.cssText = 'bottom: 200%;'
  $('.inputPwdPop')[0].style.cssText = 'bottom: 200%;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
}
const showIptPop = () => {
  $('.inputPwdPop')[0].style.cssText = 'top: 50%; '
  $('.delWalletPop')[0].style.cssText = 'bottom: 200%;'
}

const back=()=>{
  window.history.go(-1)
}