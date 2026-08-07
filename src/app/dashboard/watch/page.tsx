'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HealthSyncService, WatchManager, type HealthData, type WatchDevice } from '@/lib/healthSync';

export default function WatchSyncPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [devices, setDevices] = useState<WatchDevice[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);

  useEffect(() => {
    // 加载缓存数据
    const cached = HealthSyncService.getInstance().getCachedData();
    if (cached) setHealthData(cached);

    // 扫描设备
    WatchManager.getInstance().scanDevices().then(setDevices);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    const data = await HealthSyncService.getInstance().readTodayData();
    setHealthData(data);

    // 同步到已连接的手表
    const watchManager = WatchManager.getInstance();
    const connectedDevices = watchManager.getDevices().filter((d) => d.connected);
    for (const device of connectedDevices) {
      await watchManager.syncToWatch(device.id, data);
    }

    setSyncing(false);
  };

  const handleConnect = async (deviceId: string) => {
    await WatchManager.getInstance().connectDevice(deviceId);
    const updated = await WatchManager.getInstance().scanDevices();
    setDevices(updated);
  };

  const handleDisconnect = (deviceId: string) => {
    WatchManager.getInstance().disconnectDevice(deviceId);
    const updated = WatchManager.getInstance().getDevices();
    setDevices(updated);
  };

  const toggleAutoSync = () => {
    const service = HealthSyncService.getInstance();
    if (autoSync) {
      service.stopAutoSync();
    } else {
      service.startAutoSync();
      service.onHealthUpdate((data) => setHealthData(data));
    }
    setAutoSync(!autoSync);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'apple-watch': return '';
      case 'garmin': return '🏃';
      case 'fitbit': return '💪';
      case 'google-fit': return '📱';
      default: return '⌚';
    }
  };

  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'apple-watch': return '#FF3B30';
      case 'garmin': return '#00B0F0';
      case 'fitbit': return '#00C853';
      case 'google-fit': return '#4285F4';
      default: return '#888';
    }
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="text-2xl">←</Link>
        <h1 className="text-xl font-bold">运动手表同步</h1>
      </div>

      {/* 健康数据概览 */}
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base">今日健康数据</h2>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: syncing ? '#555' : 'var(--primary)',
              color: '#fff',
            }}
          >
            {syncing ? '同步中...' : '手动同步'}
          </button>
        </div>

        {healthData ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold" style={{ color: 'var(--primary)' }}>{healthData.steps.toLocaleString()}</div>
              <div className="text-xs opacity-60">步数</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold" style={{ color: '#FF6B6B' }}>{healthData.calories}</div>
              <div className="text-xs opacity-60">千卡</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold" style={{ color: '#FF4757' }}>{healthData.heartRate}</div>
              <div className="text-xs opacity-60">心率 bpm</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold" style={{ color: '#FFA502' }}>{healthData.workoutMinutes}</div>
              <div className="text-xs opacity-60">运动分钟</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold" style={{ color: '#2ED573' }}>{healthData.distance}</div>
              <div className="text-xs opacity-60">公里</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold" style={{ color: '#A29BFE' }}>{healthData.sleepHours}</div>
              <div className="text-xs opacity-60">睡眠小时</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 opacity-50">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm">点击"手动同步"获取健康数据</p>
          </div>
        )}
      </div>

      {/* 自动同步开关 */}
      <div className="card p-4 mb-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm">自动同步</div>
          <div className="text-xs opacity-50">每5分钟自动更新健康数据</div>
        </div>
        <button
          onClick={toggleAutoSync}
          className="w-12 h-6 rounded-full transition-all relative"
          style={{ background: autoSync ? 'var(--primary)' : '#555' }}
        >
          <div
            className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
            style={{ left: autoSync ? '26px' : '2px' }}
          />
        </button>
      </div>

      {/* 手表设备列表 */}
      <div className="card p-4 mb-4">
        <h2 className="font-semibold text-base mb-3">已配对设备</h2>
        {devices.length === 0 ? (
          <div className="text-center py-4 opacity-50">
            <p className="text-sm">暂无设备，点击下方扫描</p>
          </div>
        ) : (
          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                  <div>
                    <div className="font-medium text-sm">{device.name}</div>
                    <div className="text-xs opacity-50">
                      {device.connected ? (
                        <span style={{ color: '#2ED573' }}>已连接</span>
                      ) : (
                        '未连接'
                      )}
                      {device.batteryLevel && ` · ${device.batteryLevel}%`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    device.connected
                      ? handleDisconnect(device.id)
                      : handleConnect(device.id)
                  }
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: device.connected ? '#FF4757' : getDeviceColor(device.type),
                    color: '#fff',
                  }}
                >
                  {device.connected ? '断开' : '连接'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 支持的平台 */}
      <div className="card p-4">
        <h2 className="font-semibold text-base mb-3">支持的平台</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Apple Watch', icon: '⌚', desc: 'HealthKit 同步' },
            { name: 'Garmin', icon: '🏃', desc: 'Garmin Connect' },
            { name: 'Fitbit', icon: '💪', desc: 'Fitbit API' },
            { name: 'Google Fit', icon: '📱', desc: 'Health Connect' },
          ].map((platform) => (
            <div
              key={platform.name}
              className="p-3 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div className="text-xl mb-1">{platform.icon}</div>
              <div className="text-xs font-medium">{platform.name}</div>
              <div className="text-xs opacity-40">{platform.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* iOS 安装指南 */}
      <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
        <div className="text-center mb-3">
          <div className="text-lg mb-1">📲</div>
          <div className="text-sm font-medium">安装到手机（PWA）</div>
          <div className="text-xs opacity-60 mt-1">安装后可像原生 App 一样使用，支持手表数据同步</div>
        </div>

        <div className="space-y-3">
          {/* iOS 步骤 */}
          <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg"></span>
              <span className="text-sm font-medium">iOS / iPhone / iPad</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>1</span>
                <span className="opacity-80">使用 <strong>Safari</strong> 打开本页面（不支持 Chrome/微信浏览器）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>2</span>
                <span className="opacity-80">点击底部中间的 <strong>分享按钮</strong>（方框+向上箭头图标）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>3</span>
                <span className="opacity-80">向下滑动，找到并点击 <strong>"添加到主屏幕"</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>4</span>
                <span className="opacity-80">点击右上角 <strong>"添加"</strong>，桌面会出现 Builder 图标</span>
              </div>
            </div>
          </div>

          {/* Android 步骤 */}
          <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg"></span>
              <span className="text-sm font-medium">Android</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>1</span>
                <span className="opacity-80">使用 <strong>Chrome</strong> 打开本页面</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>2</span>
                <span className="opacity-80">点击右上角 <strong>菜单（⋮）</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--primary)', color: '#000' }}>3</span>
                <span className="opacity-80">点击 <strong>"安装应用"</strong> 或 <strong>"添加到主屏幕"</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[var(--border)] text-center">
          <div className="text-[10px] opacity-50">
            安装后打开 App，进入此页面即可同步手表数据
          </div>
        </div>
      </div>
    </div>
  );
}
