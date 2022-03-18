/* eslint-disable import/no-anonymous-default-export */
// 푸쉬 알림 함수
export default {
  title: 'Example Title',
  text: 'Example Description',
  skin: {
    info: {
      icon: 'fas fa-info-circle',
      txt: '#f8f9fb',
      bg: '#0c86eb',
      progress: 'rgb(12,117,204)'
    },
    success: {
      icon: 'fas fa-check-circle',
      txt: '#f8f9fb',
      bg: '#54ac3b',
      progress: 'rgb(65 158 38)'
    },
    warn: {
      icon: 'fas fa-exclamation-triangle',
      txt: '#353a40',
      bg: '#feb100',
      progress: 'rgb(196 140 11)'
    },
    error: {
      icon: 'fas fa-times',
      txt: '#f8f9fb',
      bg: '#ff395a',
      progress: 'rgb(214 41 70)'
    },
    other: {
      icon: 'fas fa-question',
      txt: '#f8f9fb',
      bg: '#464646',
      progress: 'rgb(61 52 52)'
    }
  },
  style (isMobile) {
    return `
      <style>
        section[alert] {
          user-select: none;
          position: fixed;
          top: -100px;
          right: ${isMobile ? '50%' : '10px'};
          width: ${isMobile ? 'calc(100% - 40px)' : '400px'};
          transform: ${isMobile ? 'translateX(50%)' : 'unset'};
          height: ${isMobile ? '50px' : '70px'};
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0px 2px 6px #00000050;
          z-index: 99999999999999999999999999;
          transition-duration: .4s;
          overflow: hidden;
        }
        section[alert] > .wrap {
          user-select: none;
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          padding: ${isMobile ? '6px' : '10px'};
        }
        section[alert] > .wrap > .icon {
          user-select: none;
          width: 50px;
          min-width: ${isMobile ? '38px' : '50px'};
          font-size: ${isMobile ? '26px' : '34px'};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        section[alert] > .wrap > .context {
          user-select: none;
          padding: 0 ${isMobile ? '3px' : '10px'};
          width: calc(100% - ${isMobile ? '50px' : '64px'});
        }
        section[alert] > .wrap > .context > .title {
          user-select: none;
          font-weight: 500;
          letter-spacing: .5px;
          height: ${isMobile ? '48%' : '50%'};
          margin: 0;
          font-size: ${isMobile ? '12px' : '16px'};
        }
        section[alert] > .wrap > .context > .text {
          user-select: none;
          font-size: 13px;
          height: 50%;
          display: flex;
          align-items: center;
          padding-bottom: 3px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin: 0;
        }
        section[alert] .progress {
          user-select: none;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          margin: 0;
          background-color: #eeeeee50;
        }
        section[alert] .progress > div {
          user-select: none;
          width: 0%;
          height: 100%;
          transition: 2.5s;
        }
        section[alert] .xBtn {
          user-select: none;
          width: 14px;
          height: 14px;
          background: transparent;
          border: none;
          display: ${isMobile ? 'none' : 'flex'};
          align-items: center;
          justify-content: center;
          font-size: 16px;
          opacity: .6;
        }
        section[alert] .xBtn:hover {
          user-select: none;
          box-shadow: none;
          opacity: 1;
          background: transparent;
        }
      </style>
    `;
  },
  init (skin = this.skin.info, title = this.title, text = this.text, isMobile) {
    let count = document.querySelectorAll('section[alert]').length;
    let dom = document.createElement('section');
    dom.setAttribute('alert', '');
    dom.style.backgroundColor = skin.bg;
    dom.style.color = skin.txt;
    dom.style.top = '-100px';

    dom.innerHTML = `
      <div class="wrap">
        <div class="icon"><i class="${skin.icon}"></i></div>
        <div class="context"><p class="title">${title}</p><p class="text">${text}</p></div>
        <button class="xBtn"><i class="fas fa-times"></i></button>
        <article class="progress"><div style="
          background-color: ${skin.progress}
        "></div>
      </div>${this.style(isMobile)}
    `;
    document.body.appendChild(dom);
    let xBtn = dom.children[0].children[2];
    let progress = dom.children[0].children[3].children[0];
    if (isMobile) {
      dom.onclick = () => this.close(dom);
    } else {
      xBtn.onclick = () => this.close(dom);
    }
    window.setTimeout(() => {
      dom.style.top = 60 * count + 10 + 'px';
      progress.style.width = '100%';
    }, 0);
    this.autoClose(dom);
  },
  info (title, text, isMobile = false) {
    this.init(this.skin.info, title, text, isMobile);
  },
  success (title, text, isMobile = false) {
    this.init(this.skin.success, title, text, isMobile);
  },
  warn (title, text, isMobile = false) {
    this.init(this.skin.warn, title, text, isMobile);
  },
  error (title, text, isMobile = false) {
    this.init(this.skin.error, title, text, isMobile);
  },
  other (title, text, isMobile = false) {
    this.init(this.skin.other, title, text, isMobile);
  },
  close (el) {
    el.style.top = '-100px';
    el.style.transitionDelay = '0s';
    window.setTimeout(() => el.remove(), 330); // 3300
  },
  autoClose (el) {
    window.setTimeout(() => {
      el.style.transitionDelay = '3s';
      el.style.top = '-100px';
      el.style.transitionDelay = '0s';
    }, 3300);
    window.setTimeout(() => el.remove(), 3630);
  },
}