<template>
  <div class="checkin-page">
    <!-- Top bar -->
    <header class="appbar">
      <h1 class="title">签到信息</h1>
    </header>

    <!-- Profile / header strip -->
    <section class="profile">
      <div class="avatar" aria-label="avatar">
        <svg viewBox="0 0 64 64" class="avatar-svg" role="img" aria-hidden="true">
          <circle cx="32" cy="32" r="32" fill="#e7f1ff" />
          <circle cx="32" cy="24" r="10" fill="#ffd7b5" />
          <rect x="16" y="38" width="32" height="16" rx="8" fill="#9ec9ff" />
          <circle cx="26" cy="22" r="2" fill="#333" />
          <circle cx="38" cy="22" r="2" fill="#333" />
        </svg>
      </div>
      <div class="user-meta">
        <div class="user-name">{{ name }}</div>
        <div class="user-sub">{{ plateNumber }}</div>
        <div class="user-sub">{{ phone }}</div>
      </div>
      <button class="switch-link" type="button" @click="handleSwitch">
        切换仓库 <span aria-hidden="true">➜</span>
      </button>
    </section>

    <!-- Main card -->
    <section class="card">
      <div class="section-head">
        <span class="pill">签到信息</span>
      </div>

      <div class="info-list">
        <div class="info-row">
          <span class="label">签到厂区</span>
          <span class="value">{{ factoryArea }}</span>
        </div>
        <div class="info-row">
          <span class="label">签到仓库</span>
          <span class="value">{{ warehouse }}</span>
        </div>
        <div class="info-row">
          <span class="label">签到时间</span>
          <span class="value">{{ checkInTime }}</span>
        </div>
      </div>

      <div class="metrics">
        <div class="metric metric-orange">
          <div class="metric-label">当前叫号</div>
          <div class="metric-value">{{ currentNumber }}</div>
        </div>
        <div class="metric metric-blue">
          <div class="metric-label">我的序号</div>
          <div class="metric-value">{{ myNumber }}</div>
        </div>
        <div class="metric metric-red">
          <div class="metric-label">前面等候人数</div>
          <div class="metric-value">{{ waitingCount }}</div>
        </div>
      </div>

      <button class="refresh-btn" type="button" @click="handleRefresh">
        刷新排队进度
      </button>

      <p v-if="showNote" class="note">
        此候诊信息仅供参考，以现场实际情况为准
      </p>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: '叶瑞章' },
  plateNumber: { type: String, default: '粤S12GZ7' },
  phone: { type: String, default: '13592737404' },
  factoryArea: { type: String, default: '江西厂区' },
  warehouse: { type: String, default: 'XC' },
  checkInTime: { type: String, default: '2025/10/10 10:04:25' },
  currentNumber: { type: [Number, String], default: 1 },
  myNumber: { type: [Number, String], default: 14 },
  waitingCount: { type: [Number, String], default: 13 },
  showNote: { type: Boolean, default: true }
});

const emit = defineEmits(['refresh', 'switch-warehouse']);

function handleRefresh() {
  emit('refresh');
}

function handleSwitch() {
  emit('switch-warehouse');
}
</script>

<style scoped>
:root { /* local fallbacks for readability */ }

.checkin-page {
  min-height: 100vh;
  background: #f2f5fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
}

.appbar {
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, #5db6ff 0%, #2b8eff 100%);
  border-radius: 8px 8px 0 0;
  color: #fff;
  text-align: center;
  padding: 10px 16px;
  box-shadow: 0 2px 10px rgba(43, 142, 255, 0.25);
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.profile {
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, #f0f7ff 0%, #e7f1ff 100%);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border-left: 1px solid #e3eeff;
  border-right: 1px solid #e3eeff;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: #e7f1ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-svg {
  width: 40px;
  height: 40px;
}

.user-meta { line-height: 1.2; }
.user-name {
  font-weight: 700;
  font-size: 16px;
  color: #2a2a2a;
}
.user-sub {
  font-size: 12px;
  color: #6b7280;
}

.switch-link {
  border: none;
  background: transparent;
  color: #2563eb;
  font-size: 14px;
  cursor: pointer;
}
.switch-link:hover { text-decoration: underline; }

.card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(23, 73, 158, 0.08);
}

.section-head { margin-bottom: 8px; }
.pill {
  display: inline-block;
  background: #4caf50;
  color: #fff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
}

.info-list { margin-top: 8px; }
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #e5e7eb;
}
.info-row:last-child { border-bottom: none; }
.label { color: #4b5563; }
.value { color: #111827; font-weight: 600; }

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 16px 0 8px;
}
.metric {
  text-align: center;
  border-radius: 12px;
  padding: 10px 6px;
}
.metric-label { font-size: 13px; opacity: 0.9; }
.metric-value { font-size: 24px; font-weight: 800; margin-top: 4px; }

.metric-orange { background: #fff5e7; color: #f59e0b; border: 1px solid #fde6c7; }
.metric-blue { background: #ebf3ff; color: #3b82f6; border: 1px solid #cfe0ff; }
.metric-red { background: #ffe8ea; color: #ef4444; border: 1px solid #ffd1d6; }

.refresh-btn {
  width: 100%;
  background: #2b8eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
.refresh-btn:hover { filter: brightness(1.05); }

.note {
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
  margin-top: 10px;
}

@media (min-width: 520px) {
  .checkin-page { padding-top: 24px; }
}
</style>
