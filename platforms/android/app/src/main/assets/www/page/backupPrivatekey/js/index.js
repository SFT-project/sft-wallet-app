
const hidePop = () => {
  $('.waringPop')[0].style.cssText = 'top: 200%;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
}


const showWaring  =()=>{
  console.log(1);
  $('.waringPop')[0].style.cssText = 'top: 50%; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '

}
const copyBtn = ()=>{
  hidePop()
  window.clickCopyPriv();
}
const back=()=>{
  window.history.go(-1) 
} 