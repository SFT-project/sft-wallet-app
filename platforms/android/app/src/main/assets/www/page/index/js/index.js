
const showPop = () => {
  $('.collectionPopUp')[0].style.cssText = 'bottom: 0rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const hidePop = () => {
  $('.collectionPopUp')[0].style.cssText = 'bottom: -32rem;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
  $('.sendPop')[0].style.cssText = 'bottom: -32rem; '
  $('.addWalletPop')[0].style.cssText = 'bottom:-32rem; '

}
const toggleMoreMenu = () => {
  if ($('.moreMenuBoxContent')[0].style.display === 'block') {
    $('.moreMenuBoxContent').fadeOut('slow')
    $('.moreMenuMask').fadeOut('slow')
  } else {
    $('.moreMenuBoxContent').fadeIn('slow')
    $('.moreMenuMask').fadeIn('slow')
  }
}

const showSend = () => {
  $('.sendPop')[0].style.cssText = 'bottom: -0.1rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}

const showAddWallet = () => {
  $('.addWalletPop')[0].style.cssText = 'bottom: -0.1rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const showSwitchChain = () => {
  $('.switchChain')[0].style.cssText = 'left: 0rem; '
}
const hideSwitchChain = () => {
  $('.switchChain')[0].style.cssText = 'left: -11rem; '
}

$('.switchChain .chainIcon img').on('click', (e) => {
  const clickedImg = e.currentTarget;

  const pattern = /.+?(?=\.svg)/;
  const result = clickedImg.src.match(pattern);
console.log();
  if (result) {
    const matchedText = result[0];
    const activeSrc = matchedText + 'Active.svg';
    $('.switchChain .chainIcon img')[0].src = $('.switchChain .chainIcon img')[0].src.replace("Active", "")
    $('.switchChain .chainIcon img')[1].src = $('.switchChain .chainIcon img')[1].src.replace("Active", "")
    $('.switchChain .chainIcon img')[2].src = $('.switchChain .chainIcon img')[2].src.replace("Active", "")
    //$('.switchChain .chainIcon img')[3].src = $('.switchChain .chainIcon img')[3].src.replace("Active", "")
    clickedImg.src = activeSrc
  
  }

  if(clickedImg.alt == "sft") {
  	window.clickSFT();
  } else if(clickedImg.alt == "eth") {
  	window.clickETH();
  } else if(clickedImg.alt == "bsc") {
  	window.clickBNB();
  }
})