
const showPop = ()=>{
  $('.collectionPopUp')[0].style.cssText = 'bottom: 0rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const hidePop = ()=>{
  $('.collectionPopUp')[0].style.cssText = 'bottom: -32rem;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
  $('.sendPop')[0].style.cssText = 'bottom: -32rem;'

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
$('.containerBotTitle span').click(()=>{
  $('.containerBotTitle span').removeClass('currChoose')
  $(this).addClass('currChoose')

  console.log($(this));
})

const showSend = ()=>{
  $('.sendPop')[0].style.cssText = 'bottom: -0.1rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
