
$('.tipsPop').fadeIn()
$('.bodyMask')[0].style.cssText = 'bottom: 0rem;'
const hidePop = ()=>{
$('.tipsPop').fadeOut()
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
const back=()=>{
  window.history.go(-1)
}