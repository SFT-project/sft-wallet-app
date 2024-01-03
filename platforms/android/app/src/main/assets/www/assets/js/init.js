
const showToast = (type, message) => {
  const style = `
    .toast {
      display: none;
      position: fixed;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.64rem;
      box-sizing:border-box;
      background-color: rgba(255, 255, 255, 0.8);
      color: #090B0E;
      font-size: 0.37333rem;
      text-align: center;
      z-index: 9999; 
      flex-shrink: 0;
    }
    .toast img {
      vertical-align: middle;
      margin-right: 0.37333rem;
    }
  `;

  const styleElement = $('<style>').text(style);
  $('head').append(styleElement);

  const iconUrl = type === 'success'
    ? '../../assets/toast/success.svg' // 成功图标 URL
    : '../../assets/toast/fails.svg'; // 失败图标 URL

  const toast = $(`<div class="toast ${type}"></div>`).css({
    display: 'none',
      position: 'fixed',
      top: '0.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '0.64rem',
      'box-sizing':'border-box',
     'border-radius': '0.3733rem',
      'background-color': 'rgba(255, 255, 255, 0.8)',
      color: '#090B0E',
      'font-size': '0.37333rem',
      'text-align': 'center',
      'z-index': '9999;',
      'flex-shrink': '0',
  });

  const icon = $('<img>').attr('src', iconUrl).css({
    width: '0.58667rem',
    height: '0.58667rem',
    'vertical-align': 'middle',
    'margin-right': '0.37333rem'
  });

  const text = $('<span></span>').text(message);

  toast.append(icon).append(text);
  $('body').append(toast);

  toast.fadeIn().delay(20000).fadeOut(() => {
    toast.remove();
    styleElement.remove();
  });
};
