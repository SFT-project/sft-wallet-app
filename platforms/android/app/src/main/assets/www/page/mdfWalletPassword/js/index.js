

$('.passwordInput').on('change', (e) => {
  const password = e.target.value
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (!regex.test(password)) {
    let uppercaseRegex = /^(?=.*[A-Z])/;
    let lowercaseRegex = /^(?=.*[a-z])/;
    let digitRegex = /^(?=.*\d)/;

    if (!uppercaseRegex.test(password)) {
      console.log("密码不包含大写字母");
      $('.info p')[0].style.color = 'red'
    }
    if (!lowercaseRegex.test(password)) {
      console.log("密码不包含小写字母");
      $('.info p')[1].style.color = 'red'

    }
    if (!digitRegex.test(password)) {
      console.log("密码不包含数字");
      $('.info p')[2].style.color = 'red'

    }
    if (password.length < 8) {
      console.log("密码长度小于 8 位");
      $('.info p')[3].style.color = 'red'

    }
  } else {
    console.log("密码符合要求");
    $('.info p')[0].style.color = '#181719'
    $('.info p')[1].style.color = '#181719'
    $('.info p')[2].style.color = '#181719'
    $('.info p')[3].style.color = '#181719'

  }

})
const showPop = () => {
  $('.walletTips')[0].style.cssText = 'display: flex; '
  $('.bodyMask')[0].style.cssText = 'bottom: 0rem; '
}
const hidePop = () => {
  $('.walletTips')[0].style.cssText = 'display: none;'
  $('.bodyMask')[0].style.cssText = 'bottom: -32rem;'

}
const back=()=>{
  window.history.go(-1)
}