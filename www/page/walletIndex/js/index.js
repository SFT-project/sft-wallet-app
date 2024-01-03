

const hidePop = () => {
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'
  $('.addWalletPop')[0].style.cssText = 'bottom:-32rem; '
  $('.languagePop')[0].style.cssText = 'bottom:-32rem; '

}

const showAddWallet = () => {
  $('.addWalletPop')[0].style.cssText = 'bottom: -0.1rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const showLanguage = () => {
  $('.languagePop')[0].style.cssText = 'bottom: -0.1rem; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}

