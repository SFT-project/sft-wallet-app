
const showPop = ()=>{
  $('.collectionPopUp')[0].style.cssText = 'bottom: 0rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const hidePop = ()=>{
  $('.collectionPopUp')[0].style.cssText = 'bottom: -32rem;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
}
const toggleMoreMenu = ()=>{
  if($('.moreMenuBoxContent')[0].style.display ==='block'){
    $('.moreMenuBoxContent').fadeOut('slow')
    $('.moreMenuMask').fadeOut('slow')
  }else{
    $('.moreMenuBoxContent').fadeIn('slow')
    $('.moreMenuMask').fadeIn('slow')

  }

}
const handleScan = ()=>{
  console.log(1);
  
}
const back=()=>{
  window.history.go(-1)
}