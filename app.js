(function () {
  const timeEl = document.getElementById('timeValue');
  const powerEl = document.getElementById('powerValue');
  const currentEl = document.getElementById('currentValue');
  const progressTextEl = document.getElementById('progressText');
  const progressValueEl = document.getElementById('progressValue');
  const progressBarEl = document.getElementById('progressBar');
  const progressBarAria = document.getElementById('progressBarAria');
  const batteryFillEl = document.getElementById('batteryFill');

  let elapsedSeconds = 0;
  let progressPercent = 0;
  const maxPowerKW = 80; // 峰值功率（kW），可调整
  const minPowerKW = 8;  // 尾段最小功率
  const batteryVoltage = 400; // 车辆电压（V），用于估算电流

  function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function computePower(progress) {
    // 简单充电曲线：前段高功率，中后段逐步衰减，并加入轻微抖动
    const normalized = progress / 100; // 0..1
    const taperFactor = 1 - 0.65 * Math.pow(normalized, 1.7);
    const jitter = (Math.random() - 0.5) * 2; // ±1kW 抖动
    const p = Math.max(minPowerKW, maxPowerKW * taperFactor + jitter);
    return Math.min(maxPowerKW, Math.max(minPowerKW, p));
  }

  function tick() {
    elapsedSeconds += 1;

    const powerKW = computePower(progressPercent);
    const currentA = Math.round((powerKW * 1000) / batteryVoltage);

    // 根据功率推演进度增速，越靠后越慢
    let delta = (powerKW / maxPowerKW) * 1.25; // 基准增速（%/s）
    delta *= 1 - Math.pow(progressPercent / 100, 1.4) * 0.4; // 尾段再降速
    delta = Math.max(0.18, Math.min(1.65, delta));

    progressPercent = Math.min(100, progressPercent + delta);

    // 更新 UI
    timeEl.textContent = formatTime(elapsedSeconds);
    powerEl.textContent = powerKW.toFixed(1);
    currentEl.textContent = String(currentA);

    const shownPercent = Math.round(progressPercent);
    progressTextEl.textContent = `${shownPercent}%`;
    progressValueEl.textContent = String(shownPercent);
    progressBarEl.style.width = `${progressPercent}%`;
    progressBarAria.setAttribute('aria-valuenow', String(shownPercent));

    batteryFillEl.style.width = `${progressPercent}%`;

    if (progressPercent >= 100) {
      clearInterval(timer);
      document.body.classList.add('done');
      document.querySelector('.title').textContent = '已充满';
    }
  }

  // 启动计时
  const timer = setInterval(tick, 1000);
  // 初始化一次
  tick();
})();